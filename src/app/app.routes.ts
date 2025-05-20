import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberFormComponent } from './members/member-form/member-form.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { LoanFormComponent } from './loans/loan-form/loan-form.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { LateLoansComponent } from './loans/late-loans/late-loans.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'main-menu', component: MainMenuComponent },

  { path: 'members', component: MembersListComponent },
  { path: 'members/new', component: MemberFormComponent },
  { path: 'members/edit/:id', component: MemberFormComponent },

  { path: 'items', component: ItemsListComponent },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/edit/:id', component: ItemFormComponent },

  { path: 'loans', component: LoanListComponent },
  { path: 'loans/new', component: LoanFormComponent },
  { path: 'late-loans', component: LateLoansComponent },
];
