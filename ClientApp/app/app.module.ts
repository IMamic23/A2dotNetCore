import { BrowserXhr } from '@angular/http';
import { ProgressService, BrowserXhrWithProgress } from './services/progress.service';
import { PhotoService } from './services/photo.service';
import { PaginationComponent } from './components/shared/pagination.component';
import * as Raven from "raven-js";
import { AppErrorHandler } from "./components/app/app.error-handler";
import { UniversalModule } from "angular2-universal";
import { FormsModule } from "@angular/forms";
import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastyModule } from "ng2-toasty";

import { VehicleService } from "./services/vehicle.service";
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { CounterComponent } from "./components/counter/counter.component";
import { VehicleFormComponent } from "./components/vehicle-form/vehicle-form.component";
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

Raven.config("https://f30ee7661839445f92ad72044ff7a487@sentry.io/167797").install();

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        UniversalModule, // must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: "", redirectTo: "vehicles", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "counter", component: CounterComponent },
            { path: "vehicles", component: VehicleListComponent },
            { path: "fetch-data", component: FetchDataComponent },
            { path: "vehicles/new", component: VehicleFormComponent },
            { path: "vehicles/:id", component: ViewVehicleComponent },
            { path: "vehicles/edit/:id", component: VehicleFormComponent },
            { path: "**", redirectTo: "home" }
        ])
    ],
    providers: [
        {
            provide: ErrorHandler, useClass: AppErrorHandler
        },
        {
            provide: BrowserXhr, useClass: BrowserXhrWithProgress
        },
        VehicleService,
        PhotoService, 
        ProgressService
    ]
})
export class AppModule {
}
