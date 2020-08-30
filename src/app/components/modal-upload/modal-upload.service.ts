import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public hide: string = 'hide';

  public notification = new EventEmitter<any>();

  constructor() { 
    console.log('Modal-upload works');
  }

  hideModal(){
    this.hide = 'hide';
    this.id = null;
    this.tipo = null;
  }

  showModal(id: string, tipo: string){
    this.hide = '';
    this.id = id;
    this.tipo = tipo;
  }
}
