import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterLink,
    NgModule,
    NgFor,
    FormsModule,
    ItemsListComponent
  ],
  exports: [ItemsListComponent]
})
export class ItemsModule { }
