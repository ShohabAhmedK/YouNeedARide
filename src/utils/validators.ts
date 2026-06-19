export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const validatePhone = (phone: string): boolean =>
  /^\+?[0-9]{7,15}$/.test(phone.replace(/[\s-]/g, ''));

export const validatePassword = (password: string): boolean =>
  password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
