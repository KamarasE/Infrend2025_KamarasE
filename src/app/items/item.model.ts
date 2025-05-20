export interface Item {
  id?: number;
  type: 'book' | 'cd' | 'kotta';
  author: string;
  title: string;
  acquisitionDate: Date;
  inventoryNumber: string;
  status: 'available' | 'loaned' | 'discarded';
}
