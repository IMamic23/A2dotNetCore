import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from "@angular/core";
import { Vehicle, KeyValuePair, Make } from "./../models/vehicle";

@Component({
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.css"]
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 5;
  
  queryResult: any = {};
  makes: any;
  models: any;
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Click for Details' }
  ];

  constructor(private vahicleService: VehicleService) { }

  ngOnInit() {
    this.vahicleService.getMakes()
      .subscribe(makes => this.makes = makes);
  
    this.populateVehicles();
  }

  private populateModels() {
    if(this.query.makeId)
    var selectedMake = this.makes.find(m => m.id == this.query.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  private populateVehicles() {
    this.vahicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult = result);
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateModels();
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy(columnName) {
    if(this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChanged(page) {
    this.query.page = page;
    this.populateVehicles();
  }
}
