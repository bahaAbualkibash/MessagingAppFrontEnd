import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from '../../services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members$!: Observable<Member[]>;
  constructor(private MemberService: MemberService) {}

  ngOnInit(): void {
    this.members$ = this.MemberService.getMembers();
  }
}
