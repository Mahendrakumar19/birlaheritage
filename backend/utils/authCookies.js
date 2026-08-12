const env = require('../config/env');

const ACCESS_COOKIE = 'bh_admin_access';
const REFRESH_COOKIE = 'bh_admin_refresh';

function cookieOptions(maxAge) {
  return {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    domain: env.cookieDomain || undefined,
    path: '/',
    maxAge,
  };
}

function parseCookies(req) {
  return String(req.headers.cookie || '')
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, pair) => {
      const separator = pair.indexOf('=');
      if (separator < 0) return cookies;
      const key = decodeURIComponent(pair.slice(0, separator));
      const value = decodeURIComponent(pair.slice(separator + 1));
      cookies[key] = value;
      return cookies;
    }, {});
}

function getAccessToken(req) {
  return parseCookies(req)[ACCESS_COOKIE] || null;
}

function getRefreshToken(req) {
  return parseCookies(req)[REFRESH_COOKIE] || null;
}

function setAuthCookies(res, accessToken, refreshToken) {
  res.cookie(ACCESS_COOKIE, accessToken, cookieOptions(15 * 60 * 1000));
  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000));
}

function clearAuthCookies(res) {
  const options = cookieOptions(0);
  res.clearCookie(ACCESS_COOKIE, options);
  res.clearCookie(REFRESH_COOKIE, options);
}

module.exports = {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  parseCookies,
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
  clearAuthCookies,
};
