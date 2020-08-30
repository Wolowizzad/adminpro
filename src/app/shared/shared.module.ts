import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NofoundComponent } from './nofound/nofound.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { LoadingComponent } from './loading/loading.component';
// Spinner module
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations: [
        NofoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        NgxSpinnerModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        NofoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        LoadingComponent

    ]
})
export class SharedModule { }