import { SaveModel, AdditionalInfo } from './../components/models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class AddInfoService {
    private readonly addInfoEndpoint = "/api/additionalInfo";

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getAdditionalInfo(id) {
        return this.http.get(this.addInfoEndpoint + "/" + id)
            .map(res => res.json());
    }
    
    create(additionalInfo) {
        return this.authHttp.post(this.addInfoEndpoint, additionalInfo)
                .map(res => res.json());
    }

    update(additionalInfo: AdditionalInfo) {
        return this.authHttp.put(this.addInfoEndpoint + "/" + additionalInfo.vehicleId, additionalInfo)
          .map(res => res.json());
    }

    delete(id) {
        return this.authHttp.delete(this.addInfoEndpoint + "/" + id)
          .map(res => res.json());
    }
}