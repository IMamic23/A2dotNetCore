import { AddInfoService } from './../../services/add-info.service';
import { Vehicle, AdditionalInfo } from './../models/vehicle';
import { Auth } from './../../services/auth.service';
import { BrowserXhr } from '@angular/http';
import { NgZone } from '@angular/core';
import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'rb-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
  providers: [
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        ProgressService
        ]  
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('photoFileInput') fileInput2: ElementRef;
  vehicle: Vehicle = null;
  additionalInfo: AdditionalInfo = null;
  vehicleId: number;
  photos: any[];
  logo: any;
  progress: any;
  subscription: any;
  file: any;
  interval: any;
  additionalInfoTitles: any = {
    modelType: "Model Type",
    modelEngineType: "Engine Type",
    yearOfManafacture: "Year of manufacture",
    firstRegistrationYear: "First registration year",
    mileage: "Mileage",
    modelEnginePower: "Engine power",
    gearType: "Gear type",
    noOfGears: "Number of gears",
    fuelConsumption: "Fuel consumption",
    carState: "Car state",
    carColor: "Car color",
    ownerNo: "Owner number",
    carCurrentLocation: "Car Current Location",
    carDescription: "Car Description"
  };

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService,
    private addInfoService: AddInfoService,
    private auth: Auth,
    ) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if(isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });

    }

  ngOnInit() {
    this.zone.run(() => {
            this.getVehicleLogoAndPhotos();
        });
  }

  getVehicleLogoAndPhotos() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe( v => { this.vehicle = v;
        if(this.vehicle)
          this.photoService.getLogo(this.vehicle.make.id)
            .subscribe(logo => this.logo = logo); 
      },
        err => {
          if(err.status = 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
    this.addInfoService.getAdditionalInfo(this.vehicleId)
      .subscribe(addInfo => this.additionalInfo = addInfo);
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);
  }

  delete() {
    if(confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.toasty.success({
            title: 'Success',
            msg: 'Vehicle is sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput2.nativeElement;
    this.file = nativeElement.files[0];
    
    this.useProgress();
    
    nativeElement.value = '';

    this.photoService.upload(this.vehicleId, this.file)
      .subscribe(photo => {
        this.photos.push(photo);
      }, err => {
        this.toasty.error({
            title: 'Error',
            msg: err.text(),
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
      });
  }

  useProgress() {
    this.subscription = this.progressService.startTracking()
      .subscribe(progress => {
        console.log(progress);
        this.zone.run(() => {
            this.progress = progress;
        });
      }, null, 
      () => { this.progress = null });
  }

  uploadLogo() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.file = nativeElement.files[0];
    
    this.useProgress();
    
    nativeElement.value = '';

    this.photoService.uploadLogo(this.vehicle.make.id, this.file)
      .subscribe(logo => {
        this.logo = logo;
      }, err =>{
        this.toasty.error({
            title: 'Error',
            msg: err.text(),
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
      });
  }

  cancleUpload() {
    if(this.subscription)
      this.subscription.unsubscribe();
    
     //this.progressService.abort();
     this.file = null;
     this.progress = null;
  }

  deletePhoto(photo) {
    if(confirm("Are you sure?")) {
      this.photoService.deletePhoto(photo.id)
        .subscribe(x => {
          this.photos.splice(this.photos.indexOf(photo), 1);
          this.toasty.success({
            title: 'Success',
            msg: 'Photo is sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        }, err => {
        this.toasty.error({
            title: 'Error',
            msg: err.text(),
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
      });
    }
  }

}
