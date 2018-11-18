import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../providers/user';
import { UserOptions } from '../../interfaces/user-options';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  
  private login: UserOptions = { username: '', password: '' };
  private submitted = false;

  constructor(
    public user: User,
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    
    this.submitted = true;

    if (form.valid) {
      this.user.login(this.login.username);
      this.router.navigateByUrl('/home');
    }
  
}

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

}