import { Injectable } from '@angular/core';
import {Headers, Http,  RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class EventsService {

constructor(private http: Http, private authHttp: AuthHttp) { }
    getEvents(date: string, sport) {
        let headers = new Headers();
        var token = 'Bearer c8580cc7-c8c0-4afd-a7e1-fa45e11254f6';
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer c8580cc7-c8c0-4afd-a7e1-fa45e11254f6');
        let options = new RequestOptions({headers: headers});
        console.log(headers);

        return this.authHttp.get(`https://erikberg.com/events.json?date=${date}&sport=${sport}`, 
            options).map(res => res.json());
    }

    getStandings() {
        return this.http.get('https://erikberg.com/mlb/standings.json')
            .map(res => res.json());
    }
}