import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  imports : [NgFor,FormsModule,RouterLink,CommonModule]
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  searchTerm: string = '';

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems(this.searchTerm).subscribe(data => {
      this.items = data;
    });
  }

  markAsDeleted(itemId: number): void {
    if (confirm('Biztosan selejtezed ezt az anyagot?')) {
      this.itemService.markAsDeleted(itemId).subscribe(() => {
        this.loadItems();
      });
    }
  }
}
