import { AUTH_CONFIG } from '@/constants/auth';

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  const { PASSWORD_REQUIREMENTS } = AUTH_CONFIG;
  
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    return { isValid: false, message: PASSWORD_REQUIREMENTS.MESSAGES.MIN_LENGTH };
  }
  if (!PASSWORD_REQUIREMENTS.PATTERNS.UPPERCASE.test(password)) {
    return { isValid: false, message: PASSWORD_REQUIREMENTS.MESSAGES.UPPERCASE };
  }
  if (!PASSWORD_REQUIREMENTS.PATTERNS.LOWERCASE.test(password)) {
    return { isValid: false, message: PASSWORD_REQUIREMENTS.MESSAGES.LOWERCASE };
  }
  if (!PASSWORD_REQUIREMENTS.PATTERNS.SYMBOL.test(password)) {
    return { isValid: false, message: PASSWORD_REQUIREMENTS.MESSAGES.SYMBOL };
  }
  
  return { isValid: true, message: '' };
}; 