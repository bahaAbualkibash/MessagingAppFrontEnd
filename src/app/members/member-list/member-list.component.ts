import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from '../../services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members!: Member[];
  constructor(private MemberService: MemberService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.MemberService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }
}
