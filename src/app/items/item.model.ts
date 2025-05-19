export interface Item {
  id?: number;
  type: 'könyv' | 'cd' | 'kazetta' | 'kotta';
  author: string;
  title: string;
  acquisitionDate: Date;
  serialNumber: string;
  status: 'szabad' | 'kikölcsönzött' | 'selejtezett';
}
