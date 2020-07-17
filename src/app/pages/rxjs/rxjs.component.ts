import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subs: Subscription;

  constructor() {

    this.subs = this.returnObservable().pipe(
    ).subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.subs.unsubscribe();

  }

  returnObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        }
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(interval);
        //   observer.error('Error!');
        // }

      }, 1000);

    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if((valor % 2) === 1){
          return true;
        }
        else{
          return false;
        }
      })
      );
  }

}
