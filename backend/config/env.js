const DEFAULT_JWT_SECRET = 'food-del-default-jwt-secret-change-in-render';

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

    if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
        console.warn('JWT_SECRET is not set. Using a default fallback secret.');
    }

    return secret;
};

module.exports = {
    getJwtSecret
};
