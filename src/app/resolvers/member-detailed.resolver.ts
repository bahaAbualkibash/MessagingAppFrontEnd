import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Member } from '../models/member';
import { MemberService } from '../services/members.service';

@Injectable({
  providedIn: 'root',
})
export class MemberDetailedResolver implements Resolve<Member> {
  constructor(private memberService: MemberService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.memberService.getMember(<string>route.paramMap.get('username'));
  }
}
