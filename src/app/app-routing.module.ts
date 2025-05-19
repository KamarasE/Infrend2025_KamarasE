import { Routes } from '@angular/router';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberFormComponent } from './members/member-form/member-form.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { LoanFormComponent } from './loans/loan-form/loan-form.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { OverdueListComponent } from './loans/overdue-list/overdue-list.component';

const routes: Routes = [
  { path: 'members', component: MembersListComponent },
  { path: 'members/new', component: MemberFormComponent },
  { path: 'members/edit/:id', component: MemberFormComponent },

  { path: 'items', component: ItemsListComponent },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/edit/:id', component: ItemFormComponent },

  { path: 'loans/new', component: LoanFormComponent },
  //{ path: 'returns', component: ReturnFormComponent },
  //{ path: 'late-loans', component: LateLoansComponent },

  { path: '', redirectTo: '/members', pathMatch: 'full' },
];
