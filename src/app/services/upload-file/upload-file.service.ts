import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', file, file.name);

      // PETICION AJAX

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('falló');
            resolve(xhr.response);
          }
        }
      };

      let url = URL_SERVICES + '/upload/' + tipo + "/" + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}
