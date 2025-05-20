import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  
  router = inject(Router);
  
  //Member
  openMembers(){
    this.router.navigate(['members']);
  }

  openEditMember(){
    this.router.navigate(['members/edit/:id']);
  }

  openCreateMember(){
    this.router.navigate(['members/new']);
  }


  //Items
  openItems(){
    this.router.navigate(['items']);
  }

  openCreateItem(){
    this.router.navigate(['items/new']);
  }

  openEditItem(){
    this.router.navigate(['items/edit/:id']);
  }

  openLoans(){
    this.router.navigate(['loans']);
  }

  openNewLoan(){
    this.router.navigate(['loans/new']);
  }

  openReturns(){
    this.router.navigate(['returns']);
  }

  openLateLoans(){
    this.router.navigate(['late-loans']);
  }

  }
