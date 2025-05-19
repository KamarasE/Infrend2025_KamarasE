import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../member.service';
import { Member } from '../member.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  imports: [FormsModule]
})
export class MemberFormComponent implements OnInit {
  member: Member = { name: '', phone: '', idCardNumber: '', address: '' };
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.memberService.getMember(+id).subscribe(data => this.member = data);
    }
  }

  save() {
    const req = this.isEdit
      ? this.memberService.updateMember(this.member)
      : this.memberService.addMember(this.member);

    req.subscribe(() => this.router.navigate(['/members']));
  }
}
