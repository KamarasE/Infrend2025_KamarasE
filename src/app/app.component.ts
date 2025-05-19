import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MembersListComponent } from './members/members-list/members-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
