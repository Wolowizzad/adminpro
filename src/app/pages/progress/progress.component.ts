import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  progreso1: number = 40;
  progreso2: number = 25;

  constructor() { }

  ngOnInit(): void {
  }
}
