import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class MakeService {
    private readonly makesEndpoint = "/api/makes";

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getMakes() {
        return this.http.get(this.makesEndpoint)
            .map(res => res.json());
    }

    getMake(id) {
        return this.http.get(this.makesEndpoint + "/" + id)
            .map(res => res.json());
    }
    
    create(make) {
        return this.authHttp.post(this.makesEndpoint, make)
                .map(res => res.json());
    }

    update(make: SaveMake) {
        return this.authHttp.put(this.makesEndpoint + "/" + make.id, make)
          .map(res => res.json());
    }

    delete(id) {
        return this.authHttp.delete(this.makesEndpoint + "/" + id)
          .map(res => res.json());
    }
}