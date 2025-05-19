export function isValidLoanDate(date: string): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

export function isValidMemberId(id: any): boolean {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

export function isValidItemId(inventoryNumber: any): boolean {
  return typeof inventoryNumber === 'string' && inventoryNumber.trim().length > 0;
}
