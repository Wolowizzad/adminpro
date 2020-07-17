import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NofoundComponent } from './shared/nofound/nofound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graphs1Component } from './pages/graphs1/graphs1.component';
import { PromisesComponent } from './pages/promises/promises.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';


const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent,  data: { title: 'Progress' } },
      { path: 'graphs1', component: Graphs1Component,  data: { title: 'Graphs' } },
      { path: 'promises', component: PromisesComponent,  data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent,  data: { title: 'RxJs' } },
      { path: 'account-settings', component: AccountSettingsComponent,  data: { title: 'Theme Settings' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NofoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
