import { FeatureService } from './../../services/feature.service';
import { Auth } from './../../services/auth.service';
import { PhotoService } from './../../services/photo.service';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
import { ModelService } from './../../services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MakeService } from './../../services/make.service';
import { SaveMake, SaveModel, SaveVehicle, SaveFeature, Makes } from './../models/vehicle';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'rb-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.css']
})
export class MakeFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  hidden = false;
  highlighted = false;
  makes: Makes[] = [];
  models: any[] = [];
  features: any[] = [];
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
  feature: SaveFeature = {
    id: 0,
    name: ''
  }

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router,
    private makeService: MakeService,
    private modelService: ModelService,
    private featureService: FeatureService,
    private toastyService: ToastyService,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    var sources = [
      this.makeService.getMakes(),
      this.featureService.getFeatures()
    ];
    
    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      this.sortData(this.makes);
      this.sortData(this.features);
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);
    });
  }

  sortData(input: any): any{
      return input.sort((n1,n2) : number => {
              if (n1.name > n2.name) {
                  return 1;
              }
              if (n1.name < n2.name) {
                  return -1;
              }
                return 0;
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
    this.sortData(this.models);

    if(this.vehicle.makeId != null && this.vehicle.makeId != 0){
      this.photoService.getLogo(this.vehicle.makeId)
          .subscribe(logo => this.logo = logo);
    }  
  }

  submitMake(f: NgForm) {
    var result$ = this.makeService.create(this.saveMake);
    result$.subscribe(make => {
      this.makes.push(make);
      make.new = true;
      this.saveMake.name = '';
      f.resetForm();
      this.toastyMessage("Make is sucessfully saved.");
      this.sortData(this.makes);
    });
   };

  submitModel(f: NgForm) {
    this.model.makeId = this.vehicle.makeId; 
    var result2$ = this.modelService.create(this.model);
    result2$.subscribe(model => {
      this.models.push(model);
      model.new = true;
      this.toastyMessage("Model is sucessfully saved.");
      this.sortData(this.models);
    });
    this.model.name = '';
  };

  submitFeature(f: NgForm) {
    var result3$ = this.featureService.create(this.feature);
    result3$.subscribe(feature => {
      this.features.push(feature);
      feature.new = true;
      this.toastyMessage("Feature is sucessfully saved.");
      this.sortData(this.features);
      this.feature.name = '';
      f.resetForm();
    }); 
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
          this.toastyMessage("Make is sucessfully deleted.");
        });
    }
  }

  deleteModel(model){
      if(confirm("Are you sure?")) {
      this.modelService.delete(model.id)
        .subscribe(x => {
          this.models.splice(this.models.indexOf(model), 1);
          this.toastyMessage("Model is sucessfully deleted.");
        });
    }
  }

  deleteFeature(feature, f: NgForm){
      if(confirm("Are you sure?")) {
      this.featureService.delete(feature.id)
        .subscribe(x => {
          this.features.splice(this.features.indexOf(feature), 1);
          this.toastyMessage("Feature is sucessfully deleted.");
          f.resetForm();
        });
    }
  }

  toastyMessage(inputMsg: string) {
    this.toastyService.success({
            title: 'Success',
            msg: inputMsg,
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
  }

  resetForm(f: NgForm){
    f.resetForm();
  }
 
  goBack() {
    window.history.back();
  }
}
