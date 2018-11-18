import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { UserFavourites } from './favourites' 

@Injectable({
  providedIn: 'root'
})
export class User {

  public LOGGED_IN = 'hasLoggedIn';
  public SEEN_TUTORIAL = 'hasSeenTutorial';

  public favourites: UserFavourites = new UserFavourites()

  constructor(
    public events: Events,
    public storage: Storage,
  ) { }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return this.events.publish('user:login');
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      this.events.publish('user:logout');
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return this.events.publish('user:signup');
    });
  }

}