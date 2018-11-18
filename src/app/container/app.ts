import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Events, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { User } from '../providers/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  public loggedIn = false;

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private user: User
  ) {
    this.initializeApp();
  }

  checkLoginStatus() {
    return this.user.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  listenForLoginEvents() {
    
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.user.logout().then(() => {
      return this.navigate('/app/tabs/(schedule:schedule)');
    });
  }

  navigate(url: string) {
    return this.router.navigateByUrl(url);
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', 'false');
    this.router.navigateByUrl('/tutorial');
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

}
