// Admin session metadata only. Authentication tokens are HttpOnly cookies and
// are never exposed to browser JavaScript.
const USER_KEY   = 'birla_admin_user';
const LEGACY_TOKEN_KEYS = [
  'birla_admin_jwt',
  'birla_admin_token',
  'birla_admin_key',
  'admin_token',
  'adminToken',
  'birla_admin_expiry',
];

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  role: string;
  lastLogin?: string;
}

export function saveSession(
  _token: string | undefined,
  user: AdminUser,
  _expiresIn?: string,
): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  LEGACY_TOKEN_KEYS.forEach(k => localStorage.removeItem(k));
}

export function getToken(): string | null {
  return null;
}

export function getUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(USER_KEY);
  LEGACY_TOKEN_KEYS.forEach(k => localStorage.removeItem(k));
}

export function isAuthenticated(): boolean {
  return Boolean(getUser());
}

// Aliases
export { clearSession as clearToken };
export { saveSession as saveToken };
