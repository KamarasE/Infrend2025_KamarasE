export function isValidInventoryNumber(inventoryNumber: any): boolean {
  return typeof inventoryNumber === 'string' && inventoryNumber.trim().length >= 1;
}

export function isValidTitle(title: string): boolean {
  return typeof title === 'string' && title.trim().length >= 2;
}

export function isValidType(type: string): boolean {
  return ['book', 'cd', 'kotta'].includes(type.toLowerCase());
}

export function isValidDate(date: string): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

export function isValidStatus(status: string): boolean {
  return ['available', 'loaned', 'discarded'].includes(status.toLowerCase());
}
