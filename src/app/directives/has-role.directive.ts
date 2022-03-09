import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  user!: User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private AccountService: AccountService
  ) {
    this.AccountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = <User>user;
      console.log(this.user);
    });
  }
  ngOnInit(): void {
    //clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }
    if (this.user.roles.some((r) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
