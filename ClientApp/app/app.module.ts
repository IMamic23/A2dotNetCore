import { AppErrorHandler } from './components/app/app.error-handler';
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

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        UniversalModule, // must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "counter", component: CounterComponent },
            { path: "fetch-data", component: FetchDataComponent },
            { path: "vehicles/new", component: VehicleFormComponent },
            { path: "**", redirectTo: "home" }
        ])
    ],
    providers: [
        {
            provide: ErrorHandler, useClass: AppErrorHandler
        },
        VehicleService
    ]
})
export class AppModule {
}
