export const AUTH_CONFIG = {
  PASSWORD_REQUIREMENTS: {
    MIN_LENGTH: 8,
    PATTERNS: {
      UPPERCASE: /[A-Z]/,
      LOWERCASE: /[a-z]/,
      SYMBOL: /[!@#$%^&*(),.?":{}|<>]/,
    },
    MESSAGES: {
      MIN_LENGTH: 'Password must be at least 8 characters long',
      UPPERCASE: 'Password must contain at least one uppercase letter',
      LOWERCASE: 'Password must contain at least one lowercase letter',
      SYMBOL: 'Password must contain at least one symbol',
    }
  },
  ROUTES: {
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
  }
}; 