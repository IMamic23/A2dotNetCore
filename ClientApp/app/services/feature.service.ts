import { SaveFeature } from './../components/models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class FeatureService {
    private readonly featuresEndpoint = "/api/features";

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getFeatures() {
        return this.http.get(this.featuresEndpoint)
            .map(res => res.json());
    }

    getFeature(id) {
        return this.http.get(this.featuresEndpoint + "/" + id)
            .map(res => res.json());
    }
    
    create(feature) {
        return this.authHttp.post(this.featuresEndpoint, feature)
                .map(res => res.json());
    }

    update(feature: SaveFeature) {
        return this.authHttp.put(this.featuresEndpoint + "/" + feature.id, feature)
          .map(res => res.json());
    }

    delete(id) {
        return this.authHttp.delete(this.featuresEndpoint + "/" + id)
          .map(res => res.json());
    }
}