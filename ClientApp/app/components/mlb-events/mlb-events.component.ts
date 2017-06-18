import { MakeFormComponent } from './../make-form/make-form.component';
import { EventsService } from './../../services/mlb-events.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-mlb-events',
  templateUrl: './mlb-events.component.html',
  styleUrls: ['./mlb-events.component.css']
})
export class MlbEventsComponent implements OnInit {
  events: any;
  standings: any;
  varDate: string;
  varSport: any;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.setDate();
    this.varSport = 'mlb';
    this.getStandings();
  }
  
  getStandings() {
    this.eventsService.getStandings()
      .subscribe(s => {
          this.standings = s;
          console.log(this.standings);
      });
  }

  getEvents() {
    this.eventsService.getEvents(this.varDate, this.varSport)
        .subscribe(events => {
          this.events = events;
          console.log(events);
        });
  }

  setDate() {
    var date = new Date();
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

  this.varDate = [
          date.getFullYear(),
          (dd>9 ? '' : '0') + dd,
          (mm>9 ? '' : '0') + mm,
         ].join('');

    console.log(this.varDate);
  }

}