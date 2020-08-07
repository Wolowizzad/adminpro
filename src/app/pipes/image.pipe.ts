import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    
    // Sino se necesita una url para nuestro backend
    let url = URL_SERVICES + '/img';
    
    if (!img) {
      return url + '/usuarios/invalid';
    }

    // Si es imagen de google retonra la misma url
    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log('Tipo de imagen no existe, usuarios, medicos u hospitales');
        url += '/usuarios/invalid';
    }

    return url;

  }

}
