import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';
//import {  } from "@angular/platform-browser";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings: SettingsService) { }

  ngOnInit(): void {
    this.check();
  }

  changeColor(theme: string, link: any) {

    this.applyCheck(link);
    this._settings.applyTheme(theme);
  }

  applyCheck(link: any) {
    let selectors: any = document.getElementsByClassName('selector');
    for (let ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  check() {
    let selectors: any = document.getElementsByClassName('selector');
    let theme = this._settings.settings.theme;

    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
