// validators/memberValidator.ts

export function isValidName(name: string): boolean {
  return typeof name === 'string' && name.trim().length >= 2;
}

export function isValidPhone(phone: string): boolean {
  return /^[0-9]{7,15}$/.test(phone);
}

export function isValidIdCardNumber(idCard: string): boolean {
  return /^[A-Z0-9]{6,12}$/i.test(idCard);
}

export function isValidIdCard(idCard: string): boolean {
  return isValidIdCardNumber(idCard); // alias, kompatibilitás miatt
}

export function isValidAddress(address: string): boolean {
  return typeof address === 'string' && address.trim().length > 5;
}
