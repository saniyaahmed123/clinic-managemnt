const jwt = require('jsonwebtoken');

const AUTH_COOKIE_NAME = 'clinic_token';
const DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const getMaxAge = (token) => {
  if (!token) return DEFAULT_MAX_AGE_MS;
  const decoded = jwt.decode(token);
  if (decoded && decoded.exp) {
    const remaining = decoded.exp * 1000 - Date.now();
    if (remaining > 0) return remaining;
  }
  return DEFAULT_MAX_AGE_MS;
};

const getAuthCookieOptions = (token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: process.env.COOKIE_SAME_SITE || 'lax',
    path: '/',
    maxAge: getMaxAge(token),
  };
};

const setAuthCookie = (res, token) => {
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions(token));
};

const clearAuthCookie = (res) => {
  const { maxAge, ...options } = getAuthCookieOptions();
  res.clearCookie(AUTH_COOKIE_NAME, options);
};

module.exports = { AUTH_COOKIE_NAME, getAuthCookieOptions, setAuthCookie, clearAuthCookie };
