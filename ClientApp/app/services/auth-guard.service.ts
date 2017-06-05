import { Auth } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: Auth) { }

    canActivate() {
        if(this.auth.authenticated())
            return true;

        window.location.href = 'https://imamicproject.eu.auth0.com/login?client=XnTO55C3CRq6W5cbHmJ0t753UhI8qIWS';
            return false;
    }
}