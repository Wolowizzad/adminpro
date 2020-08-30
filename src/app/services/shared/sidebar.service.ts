import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icono: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgressBar', url: '/progress' },
        { title: 'Grapghs', url: '/graphs1' },
        { title: 'Promises', url: '/promises' },
        { title: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      title: 'Maintenance',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: '/usuarios'},
        { title: 'Hospitals', url: 'hospitales'},
        { title: 'Medics', url: '/medicos'}
      ]
    }
  ];

  constructor() { }
}
