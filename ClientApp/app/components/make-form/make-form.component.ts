import { Auth } from './../../services/auth.service';
import { PhotoService } from './../../services/photo.service';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
import { ModelService } from './../../services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MakeService } from './../../services/make.service';
import { SaveMake, SaveModel, SaveVehicle } from './../models/vehicle';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'rb-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.css']
})
export class MakeFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  makes: any[] = [];
  models: any[] = [];
  makeId: any;
  logo: any;
  file: any;
  saveMake: SaveMake = {
    id: 0,
    name: ''
  };
  model: SaveModel = {
    id: 0,
    makeId: 0,
    name: ''
  };
    vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    additionalInfo: {
      modelType: '',
      yearOfManafacture: null,
      firstRegistrationYear: null,
      mileage: null,
      modelEngineType: '',
      modelEnginePower: null,
      gearType: '',
      noOfGears: null,
      fuelConsumption: null,
      carState: '',
      ownerNo: null,
      carCurrentLocation: '',
      carDescription: '',
      carColor: ''
    },
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router,
    private makeService: MakeService,
    private modelService: ModelService,
    private toastyService: ToastyService,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    var sources = [
      this.makeService.getMakes()
    ];
    
    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);
    });
      this.makeService.getMakes()
        .subscribe( m => {
            this.makes = m;
            this.makes.sort((n1,n2) : number => {
              if (n1.name > n2.name) {
                  return 1;
              }
          
              if (n1.name < n2.name) {
                  return -1;
              }
                return 0;
            });
          },
          err => {
            if(err.status = 404) {
              this.router.navigate(['/makes']);
              return;
          }
      });
  }

  onMakeChange() {
    this.logo = null;
    this.populateModels();
    this.vehicleSelected();
    delete this.model.id;
  }

  vehicleSelected(): boolean {
    if(this.vehicle.makeId != 0)
      return true;
    else
      return false;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    this.models.sort((n1,n2) : number => {
              if (n1.name > n2.name) {
                  return 1;
              }
              if (n1.name < n2.name) {
                  return -1;
              }
                return 0;
            });

    if(this.vehicle.makeId != null && this.vehicle.makeId != 0){
      this.photoService.getLogo(this.vehicle.makeId)
          .subscribe(logo => this.logo = logo);
    }  
  }

  submitMake() {
    var result$ = this.makeService.create(this.saveMake);
    result$.subscribe(make => {
      this.makes.push(make);
      this.toastyService.success({
        title: 'Success',
        msg: 'Make was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
    });
    this.saveMake.name = '';
   };

  submitModel() {
    this.model.makeId = this.vehicle.makeId; 
    var result2$ = this.modelService.create(this.model);
    result2$.subscribe(model => {
      this.models.push(model);
      this.toastyService.success({
        title: 'Success',
        msg: 'Model was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
    });
    this.model.name = '';
  };

   uploadLogo() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.file = nativeElement.files[0];
    
    nativeElement.value = '';

    this.photoService.uploadLogo(this.vehicle.makeId, this.file)
      .subscribe(logo => {
        this.logo = logo;
      }, err =>{
        this.toastyService.error({
            title: 'Error',
            msg: err.text(),
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
      });
  }

  deleteMake(make){
      if(confirm("Are you sure?")) {
      this.makeService.delete(make.id)
        .subscribe(x => {
          this.makes.splice(this.makes.indexOf(make), 1);
          this.toastyService.success({
            title: 'Success',
            msg: 'Make is sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    }
  }

  deleteModel(model){
      if(confirm("Are you sure?")) {
      this.modelService.delete(model.id)
        .subscribe(x => {
          this.models.splice(this.models.indexOf(model), 1);
          this.toastyService.success({
            title: 'Success',
            msg: 'Model is sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    }
  }

  goBack() {
    window.history.back();
  }
}
