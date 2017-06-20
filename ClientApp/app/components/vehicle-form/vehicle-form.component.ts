import { AddInfoService } from './../../services/add-info.service';
import * as _ from "underscore";
import { SaveVehicle, Vehicle, AdditionalInfo } from "./../models/vehicle";
import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit, NgZone } from "@angular/core";
import { ToastyService } from "ng2-toasty";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Observable/forkJoin";

@Component({
  selector: "rb-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  private years: number[] = [];
  private yy : number;
  makes: any[];
  models: any[];
  features: any[];
  additionalInfo: AdditionalInfo = {
      id: 0,
      vehicleId: 0,
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private addInfoService: AddInfoService,
    private toastyService: ToastyService,
    private zone: NgZone) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });
  }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];
    
    this.getYear();

    if (this.vehicle.id){
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
      sources.push(this.addInfoService.getAdditionalInfo(this.vehicle.id));
    }

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.setAddInfo(data[3]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  private setAddInfo(a: AdditionalInfo) {
     this.additionalInfo = a;
  }

  onMakeChange() {
    this.populateModels();

    delete this.vehicle.modelId;
  }
  
   getYear(){
        var today = new Date();
        this.yy = today.getFullYear();        
        for(var i = (this.yy); i >= (this.yy)-50; i--){
        this.years.push(i);}
    }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
    result$.subscribe(vehicle => {
      this.additionalInfo.vehicleId = vehicle.id;
      this.submitAddInfo();
      this.toastyService.success({
        title: 'Success',
        msg: 'Vehicle Data was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.zone.run(() => this.router.navigate(['/vehicles/', vehicle.id]));
    });
  }

  submitAddInfo() {
    var result$ = (this.vehicle.id) ? this.addInfoService.update(this.additionalInfo) : this.addInfoService.create(this.additionalInfo);
    result$.subscribe(addInfo => {
      this.toastyService.success({
        title: 'Success',
        msg: 'Vehicle AdditionalInfo data was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
    });
  }

  goBack() {
    window.history.back();
  }
}
