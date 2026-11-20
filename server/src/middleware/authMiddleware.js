const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { AUTH_COOKIE_NAME } = require('../utils/authCookie');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies ? req.cookies[AUTH_COOKIE_NAME] : undefined;

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }
    if (!user.isActive) {
      throw new ApiError(403, 'Account is deactivated');
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, 'Not authorized, token invalid');
  }
});

module.exports = { protect };
