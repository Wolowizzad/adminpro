import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      mensaje => console.log('Terminó!', mensaje)
    ).catch(error => console.error('Error en la promesa', error));

  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let contador = 0;

      let interval = setInterval(() => {
        contador += 1;

        console.log(contador);

        if (contador === 3) {
          resolve(true);
          //reject('Simplemente un error');
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
