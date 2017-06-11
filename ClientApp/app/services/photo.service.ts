import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
    
    constructor(private http: Http) { }


    upload(vehicleId, photo) {
        var formData = new FormData();
        formData.append("file", photo);
        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData)
            .map(res => res.json());
    }

    getPhotos(vehicleId) {
        return this.http.get(`/api/vehicles/${vehicleId}/photos`)
            .map(res => res.json());
    }

    deletePhoto(id) {
        return this.http.delete(`/api/photos/${id}`)
            .map(res => res.json());
    }

    uploadLogo(makeId, logo) {
         var formData = new FormData();
         formData.append("file", logo);
         return this.http.post(`/api/makes/${makeId}/logo`, formData)
            .map(res => res.json());
    }

    getLogo(makeId) {
        return this.http.get(`/api/makes/${makeId}/logo`)
            .map(res => res.json());
    }

}