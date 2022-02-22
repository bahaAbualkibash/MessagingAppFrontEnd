import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'The Messaging App';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  setCurrentUser() {
    const user: User = <User>JSON.parse(<string>localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
