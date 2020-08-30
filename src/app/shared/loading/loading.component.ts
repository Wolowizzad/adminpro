import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

declare function init_plugins();

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService) { }
  
  ngOnInit() {
    /** spinner starts on init */
    init_plugins();
    this.spinner.show();
  }
}