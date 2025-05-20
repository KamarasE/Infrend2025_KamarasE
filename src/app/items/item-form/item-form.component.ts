import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  imports : [FormsModule]
})
export class ItemFormComponent implements OnInit {
  item: Item = {
    type: 'book',
    author: '',
    title: '',
    acquisitionDate: new Date(),
    inventoryNumber: '',
    status: 'available'
  };

  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.itemService.getItem(+id).subscribe(data => this.item = data);
    }
  }

  save(): void {
    const req = this.isEdit
      ? this.itemService.updateItem(this.item)
      : this.itemService.addItem(this.item);
      console.log(this.item);

    req.subscribe(() => this.router.navigate(['/items']));
  }
}
