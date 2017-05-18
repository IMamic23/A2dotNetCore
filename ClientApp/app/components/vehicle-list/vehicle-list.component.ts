import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from "@angular/core";
import { Vehicle, KeyValuePair } from "./../models/vehicle";

@Component({
  templateUrl: "./vehicle-list.component.html",
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  models: KeyValuePair[];
  filter: any = {};

  constructor(private vahicleService: VehicleService) { }

  ngOnInit() {
    this.vahicleService.getMakes()
      .subscribe(makes => this.makes = makes);
    
    this.populateModels();
    this.populateVehicles();
  }

  private populateModels() {
    
  }

  private populateVehicles() {
    this.vahicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
