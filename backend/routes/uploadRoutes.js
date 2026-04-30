const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Use memory storage and upload buffer to Cloudinary manually
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload image to Cloudinary
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                success: false,
                message: 'No file provided'
            });
        }

        // Convert buffer to data URI and upload to Cloudinary
        const mimeType = req.file.mimetype || 'application/octet-stream';
        const base64 = req.file.buffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: 'fooddel/products',
            resource_type: 'auto'
        });

        res.json({
            success: true,
            imageUrl: result.secure_url,
            publicId: result.public_id,
            message: 'Image uploaded successfully'
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message
        });
    }
});

// Delete image from Cloudinary
router.delete('/delete/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;

        await cloudinary.uploader.destroy(publicId);

        res.json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
});

module.exports = router;
