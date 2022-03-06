import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from '../../services/members.service';
import { Pagination } from 'src/app/models/pagination';
import { UserParams } from 'src/app/models/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members!: Member[];
  pagination!: Pagination;
  userParams: UserParams = new UserParams();
  constructor(private MemberService: MemberService) {
    this.userParams = this.MemberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.MemberService.setUserParams(this.userParams);
    this.MemberService.getMembers(this.userParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.MemberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
