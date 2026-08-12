const ROLE_PERMISSIONS = Object.freeze({
  super_admin: ['*'],
  // Keep existing administrators functional while introducing scoped roles.
  admin: [
    'dashboard:read',
    'admissions:read',
    'admissions:write',
    'contacts:read',
    'contacts:write',
    'content:read',
    'content:write',
  ],
  content_editor: ['dashboard:read', 'content:read', 'content:write'],
  admissions_manager: [
    'dashboard:read',
    'admissions:read',
    'admissions:write',
    'contacts:read',
    'contacts:write',
  ],
  viewer: ['dashboard:read', 'admissions:read', 'contacts:read', 'content:read'],
});

function hasPermission(user, permission) {
  const permissions = ROLE_PERMISSIONS[user?.role] || [];
  return permissions.includes('*') || permissions.includes(permission);
}

function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.adminUser) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!hasPermission(req.adminUser, permission)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
        requiredPermission: permission,
      });
    }

    return next();
  };
}

module.exports = {
  ROLE_PERMISSIONS,
  hasPermission,
  requirePermission,
};
