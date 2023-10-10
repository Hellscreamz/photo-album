const jwt = require('jsonwebtoken');

async function extractUserIdFromToken(token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    return userId;
}

module.exports = {
    extractUserIdFromToken,
};