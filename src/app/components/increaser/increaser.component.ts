import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input("nombre") leyenda: string = 'Leyenda';
  @Input() progress: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter

  constructor() { 
    //console.log('Progreso', this.progreso)
  }

  ngOnInit(): void {
    //console.log('Progreso', this.progreso)
  }

  onChanges( newValue: number ){

    //let elemeHTML: any = document.getElementsByName('progreso')[0];

    if(newValue >= 100){
      this.progress = 100;
    }else if(newValue <= 0){
      this.progress = 0;      
    }else{
      this.progress = newValue;
    }
    //elemeHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progress;
    this.cambioValor.emit(this.progress);

  }

  cambiarValor(valor: number) {
    if (this.progress <= 0 && valor < 0) {
      this.progress = 0;
      return;
    }
    if (this.progress >= 100 && valor > 0) {
      this.progress = 100;
      return;
    }
    this.progress += valor;
    this.cambioValor.emit(this.progress);
  }

}
