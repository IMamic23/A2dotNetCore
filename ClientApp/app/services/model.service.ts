import { SaveModel } from './../components/models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class ModelService {
    private readonly modelsEndpoint = "/api/models";

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getModels() {
        return this.http.get(this.modelsEndpoint)
            .map(res => res.json());
    }

    getModel(id) {
        return this.http.get(this.modelsEndpoint + "/" + id)
            .map(res => res.json());
    }
    
    create(model) {
        return this.authHttp.post(this.modelsEndpoint, model)
                .map(res => res.json());
    }

    update(model: SaveModel) {
        return this.authHttp.put(this.modelsEndpoint + "/" + model.id, model)
          .map(res => res.json());
    }

    delete(id) {
        return this.authHttp.delete(this.modelsEndpoint + "/" + id)
          .map(res => res.json());
    }
}