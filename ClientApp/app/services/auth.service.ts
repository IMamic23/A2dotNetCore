import { Injectable }      from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

// Avoid name not found warnings
import Auth0Lock from 'auth0-lock';

@Injectable()
export class Auth {
  profile: any;
  private roles: string[] = [];

  // Configure Auth0
  lock = new Auth0Lock('XnTO55C3CRq6W5cbHmJ0t753UhI8qIWS', 'imamicproject.eu.auth0.com', {});

  constructor() {
    this.ReadUserFromLocalStorage();
  
    this.lock.on('authenticated', (authResult: any) => this.onUserAuthenticated(authResult));
  }

  private onUserAuthenticated(authResult) {
    localStorage.setItem('token', authResult.accessToken);

      this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
        if(error){
          throw new Error(error);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        
        this.ReadUserFromLocalStorage();
      });
  }

  private ReadUserFromLocalStorage() {
      this.profile = JSON.parse(localStorage.getItem('profile'));

      var token = localStorage.getItem('token');
      if(token) {
        var jwtHelper = new JwtHelper();
        var decodedToken = jwtHelper.decodeToken(token);
        this.roles = decodedToken['https://vega.com/roles'];
      }
  }

  public isInRole(roleName) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.profile = null;
    this.roles = [];
  }

}