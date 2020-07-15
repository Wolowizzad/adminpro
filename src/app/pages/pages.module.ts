import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';


import { AppRoutingModule } from '../app-routing.module';
//import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

//temporal
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DoughnutGraphComponent } from '../components/doughnut-graph/doughnut-graph.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        IncreaserComponent,
        DoughnutGraphComponent,
        AccountSettingsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule,
        FormsModule,
        ChartsModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
    ],
    providers: [],
})
export class PagesModule { }