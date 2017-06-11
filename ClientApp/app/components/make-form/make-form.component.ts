import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
import { ModelService } from './../../services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MakeService } from './../../services/make.service';
import { SaveMake, SaveModel, SaveVehicle } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.css']
})
export class MakeFormComponent implements OnInit {
  makes: any[] = [];
  models: any[] = [];
  makeId: any;
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
    private route: ActivatedRoute,
    private router: Router,
    private makeService: MakeService,
    private modelService: ModelService,
    private toastyService: ToastyService
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
          },
          err => {
            if(err.status = 404) {
              this.router.navigate(['/vehicles']);
              return;
          }
      });
  }

  onMakeChange() {
    this.populateModels();

    delete this.model.id;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
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

  goBack() {
    window.history.back();
  }
}
