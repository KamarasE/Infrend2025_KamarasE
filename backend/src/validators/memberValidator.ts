export function isValidName(name: any): boolean {
  return typeof name === 'string' && name.trim().length >= 2;
}

export function isValidPhone(phone: any): boolean {
  return typeof phone === 'string' && phone.trim().length >= 3;
}

export function isValidIdCardNumber(idCard: any): boolean {
  return typeof idCard === 'string' && idCard.trim().length >= 3;
}

export function isValidIdCard(idCard: any): boolean {
  return isValidIdCardNumber(idCard);
}

export function isValidAddress(address: any): boolean {
  return typeof address === 'string' && address.trim().length >= 3;
}
