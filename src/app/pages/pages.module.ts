import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
    ],
    imports: [ 
        CommonModule,
        SharedModule,
        PAGES_ROUTES
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
    ],
    providers: [],
})
export class PagesModule {}