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
  @ViewChild('f2') modelsForm: NgForm;
  hidden = false;
  selectedMake: any;
  highlighted = false;
  makes: Makes[] = [];
  models: any[] = [];
  features: any[] = [];
  makeId: any;
  logo: any;
  file: any;
  saveMake: SaveMake = {
    id: 0,
    name: '',
    models: []
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
    if(input != undefined)
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
    this.selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = this.selectedMake ? this.selectedMake.models : [];
    this.sortData(this.models);
    this.logo = this.selectedMake.logo;
  };

  selectMake(make) {
    this.vehicle.makeId = make.id;
    this.populateModels();
  }

  submitMake(f: NgForm) {
    var makeExists = this.makes.filter((obj) => {
      return obj.name.toLowerCase() === this.saveMake.name.toLowerCase();
    });
    if(makeExists.length == 0) {
      var result$ = this.makeService.create(this.saveMake);
      result$.subscribe(make => {
        this.makes.push(make);
        make.new = true;
        this.saveMake.name = '';
        f.resetForm();
        this.toastyMessage("Make is sucessfully saved.");
        this.sortData(this.makes);
        this.vehicle.makeId = make.id;
        this.populateModels();
      });
    } else {
      this.toastyService.warning({
            title: 'Warning',
            msg: "Make with same name already exists.",
            theme: 'bootstrap',
            showClose: true,
            timeout: 6000
          });
      this.saveMake.name = '';
      f.resetForm();
    }
   };

  submitModel(f: NgForm) {
    var modelExists = this.models.filter((obj) => {
      return obj.name.toLowerCase() === this.model.name.toLowerCase();
    });
    if(modelExists.length == 0) {
    this.model.makeId = this.vehicle.makeId; 
    var result2$ = this.modelService.create(this.model);
    result2$.subscribe(model => {
      this.models.push(model);
      model.new = true;
      this.toastyMessage("Model is sucessfully saved.");
      this.sortData(this.models);
    });
    this.model.name = '';
    } else {
      this.toastyService.warning({
            title: 'Warning',
            msg: "Model with same name already exists.",
            theme: 'bootstrap',
            showClose: true,
            timeout: 6000
          });
      this.model.name = '';
    }
  };
  
  // checkIfExists(items: any, item: any): any {
  //     items.filter((obj) => {
  //       return obj.name.toLowerCase() === item.name.toLowerCase();
  //   });
  // };

  submitFeature(f: NgForm) {
    var featureExists = this.features.filter((obj) => {
       return obj.name.toLowerCase() === this.feature.name.toLowerCase();
    });

    if(featureExists.length == 0) {
    var result3$ = this.featureService.create(this.feature);
    result3$.subscribe(feature => {
      this.features.push(feature);
      feature.new = true;
      this.toastyMessage("Feature is sucessfully saved.");
      this.sortData(this.features);
      this.feature.name = '';
      f.resetForm();
    });
    } else {
      this.toastyService.warning({
            title: 'Warning',
            msg: "Feature with same name already exists.",
            theme: 'bootstrap',
            showClose: true,
            timeout: 6000
          });
      this.feature.name = '';
      f.resetForm();
    }
  };

   uploadLogo() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.file = nativeElement.files[0];
    
    nativeElement.value = '';

    this.photoService.uploadLogo(this.vehicle.makeId, this.file)
      .subscribe(logo => {
        this.logo = logo;
        this.makes.filter((obj) => {
         return obj.id === this.selectedMake.id;
        })[0].logo = logo;
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
          if(make.id == this.selectedMake.id) {
            this.modelsForm.resetForm();
            this.logo = null;
            this.models = null;
          }
        });
    }
  }

  deleteLogo(logo){
    if(confirm("Are you sure?")) {
      this.photoService.deleteLogo(logo.id)
        .subscribe(x => {
          this.logo = null;
          this.makes.filter((obj) => {
           return obj.id === this.selectedMake.id;
          })[0].logo = null;
          this.toastyService.success({
            title: 'Success',
            msg: 'Logo is sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        }, err => {
        this.toastyService.error({
            title: 'Error',
            msg: err.text(),
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
      });
    }
  }
  
  activateRename(model) {
    model.renameActivated = true;
  }
  cancelRename(model) {
    model.renameActivated = false;
    this.model.name = null;
  }

  updateModel(model){
    if(confirm("Are you sure?")) {
      this.modelService.update(model)
        .subscribe(x => {
          this.toastyMessage("Model is sucessfully updated.");
          model.renameActivated = false;
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
