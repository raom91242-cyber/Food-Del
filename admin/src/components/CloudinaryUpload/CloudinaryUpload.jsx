import React, { useState } from 'react';
import { uploadAPI } from '../../services/api';
import './CloudinaryUpload.css';

const CloudinaryUpload = ({ onImageUpload, existingImage = null }) => {
    const [preview, setPreview] = useState(existingImage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleFile = async (file) => {
        setError('');
        setLoading(true);

        // Validate file
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            setLoading(false);
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size should be less than 10MB');
            setLoading(false);
            return;
        }

        try {
            // Show preview immediately
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload to Cloudinary
            const response = await uploadAPI.uploadImage(file);

            if (response.data.success) {
                onImageUpload({
                    url: response.data.imageUrl,
                    publicId: response.data.publicId
                });
            } else {
                setError('Upload failed');
                setPreview(existingImage);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Upload error');
            setPreview(existingImage);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className='cloudinary-upload'>
            <div className='upload-preview'>
                {preview ? (
                    <img src={preview} alt='Preview' className='preview-image' />
                ) : (
                    <div className='preview-placeholder'>
                        <span>📷</span>
                        <p>No image</p>
                    </div>
                )}
            </div>

            <div
                className={`upload-area ${dragActive ? 'active' : ''} ${loading ? 'loading' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {loading && <div className='spinner'></div>}

                <input
                    type='file'
                    id='image-input'
                    accept='image/*'
                    onChange={handleChange}
                    disabled={loading}
                    className='file-input'
                />

                <label htmlFor='image-input' className='upload-label'>
                    <span className='upload-icon'>⬆️</span>
                    <p className='upload-text'>
                        {loading ? 'Uploading...' : 'Drag & drop or click to upload'}
                    </p>
                    <p className='upload-hint'>PNG, JPG, GIF (Max 10MB)</p>
                </label>
            </div>

            {error && <div className='upload-error'>{error}</div>}
        </div>
    );
};

export default CloudinaryUpload;
