import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  imports : [FormsModule, RouterLink, NgFor, CommonModule]
})
export class MembersListComponent implements OnInit {
  members: Member[] = [];
  searchTerm: string = '';
  memberService = inject(MemberService)

  //constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.searchTerm).subscribe(data => {
      this.members = data;
    });
  }

  deactivateMember(memberId: number) {
    if (confirm('Biztosan inaktiválod ezt a tagot?')) {
      this.memberService.deactivateMember(memberId).subscribe(() => {
        this.loadMembers();
      });
    }
  }
}
