import { EventsService } from './services/mlb-events.service';
import { MlbEventsComponent } from './components/mlb-events/mlb-events.component';
import { MlbBoxScoreService } from './services/mlb-box-score.service';
import { MlbBoxScoreComponent } from './components/mlb-box-score/mlb-box-score.component';
import { AddInfoService } from './services/add-info.service';
import { FeatureService } from './services/feature.service';
import { ModelService } from './services/model.service';
import { MakeService } from './services/make.service';
import { AdditionalInfoComponent } from './components/view-vehicle/additional-info.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { Auth } from './services/auth.service';
import { BrowserXhr } from '@angular/http';
import { ProgressService, BrowserXhrWithProgress } from './services/progress.service';
import { PhotoService } from './services/photo.service';
import { PaginationComponent } from './components/shared/pagination.component';
import * as Raven from "raven-js";
import { AppErrorHandler } from "./components/app/app.error-handler";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastyModule } from "ng2-toasty";
import { AgmCoreModule } from '@agm/core';
import {DataTableModule} from "angular2-datatable";

import { ChartModule } from "angular2-chartjs";
import { VehicleService } from "./services/vehicle.service";
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { CounterComponent } from "./components/counter/counter.component";
import { VehicleFormComponent } from "./components/vehicle-form/vehicle-form.component";
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";
import { MakeFormComponent } from './components/make-form/make-form.component';
import { MakeListComponent } from './components/make-list/make-list.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';

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
        ViewVehicleComponent,
        AdminComponent,
        AdditionalInfoComponent,
        MakeFormComponent,
        MakeListComponent,
        MlbBoxScoreComponent,
        MlbEventsComponent,
        GoogleMapsComponent
    ],
    imports: [
        UniversalModule, // must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ToastyModule.forRoot(),
        ChartModule,
        RouterModule.forRoot([
            { path: "", redirectTo: "vehicles", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "counter", component: CounterComponent },
            { path: "vehicles", component: VehicleListComponent },
            { path: "admin", component: AdminComponent, canActivate: [AdminAuthGuard] },
            { path: "fetch-data", component: FetchDataComponent },
            { path: "makes", component: MakeListComponent },
            { path: "makes/new", component: MakeFormComponent, canActivate: [AuthGuard] },
            { path: "vehicles/new", component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: "vehicles/:id", component: ViewVehicleComponent },
            { path: "vehicles/edit/:id", component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: "mlb/boxscore/:event_id", component: MlbBoxScoreComponent, canActivate: [AuthGuard] },
            { path: "mlb/events", component: MlbEventsComponent, canActivate: [AuthGuard] },
            { path: "googlemaps", component: GoogleMapsComponent, canActivate: [AuthGuard] },
            { path: "**", redirectTo: "home" },
        ]),
        ReactiveFormsModule,
        DataTableModule,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyDD2V2T47wEoEbwIHO976afEI1jvT34lGY",
          libraries: ["places"]
        }),
    ],
    providers: [
        {
            provide: ErrorHandler, useClass: AppErrorHandler
        },
        Auth,
        AuthGuard,
        AUTH_PROVIDERS,
        AdminAuthGuard,
        PhotoService, 
        VehicleService,
        MakeService,
        ModelService,
        FeatureService,
        AddInfoService,
        MlbBoxScoreService,
        EventsService
    ]
})
export class AppModule {
}
