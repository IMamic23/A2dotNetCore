import { NgZone } from '@angular/core';
import { ProgressService } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'rb-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;
  subscription: any;
  file: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if(isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });

    }

  ngOnInit() {
    this.getVehicleAndPhotos();
  }

  getVehicleAndPhotos() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if(err.status = 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        }
      )
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
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.file = nativeElement.files[0];
    
    this.subscription = this.progressService.startTracking()
      .subscribe(progress => {
        console.log(progress);
        this.zone.run(() => {
            this.progress = progress;
        });
      }, null, 
      () => { this.progress = null });
    
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

  cancleUpload() {
    if(this.subscription)
      this.subscription.unsubscribe();
    
     //this.progressService.abort();
     this.file = null;
     this.progress = null;
  }

  deletePhoto(fileName) {
    if(confirm("Are you sure?")) {
      this.photoService.deletePhoto(fileName)
        .subscribe(x => {
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
          this.router.navigate(['/vehicles']);
      });
    }
  }

}
