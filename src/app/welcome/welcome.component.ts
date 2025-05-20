import { Component,  inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {


  router = inject(Router);

  login(){
    this.router.navigate(['main-menu']);
  }
  
}
