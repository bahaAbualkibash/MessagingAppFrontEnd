import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from '../../services/account.service';
import { MemberService } from '../../services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user!: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private accountService: AccountService,
    private MemberService: MemberService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user != null) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.MemberService.getMember(this.user.username).subscribe((member) => {
      this.member = member;
    });
  }

  updateMember() {
    console.log(this.member);
    this.MemberService.updateMember(this.member).subscribe(() => {
      console.log(this.member);
      this.toastr.success('Profile updated!');
      this.editForm.reset(this.member);
    });
  }
}
