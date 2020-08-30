import { Injectable } from '@angular/core';
import { User } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService) {

    this.getStorage();
  }

  isLogged() {
    return (this.token.length > 1) ? true : false;
  }

  getStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  setStorage(id: string, token: string, user: User) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loginGoogle(token: string) {

    let url = URL_SERVICES + '/login/google';
    return this.http.post(url, { token })
      .pipe(map((res: any) => {
        this.setStorage(res.id, res.token, res.usuario);
        return true;
      }))
  }

  logout() {

    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  login(user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post(url, user).pipe(map((res: any) => {

      this.setStorage(res.id, res.token, res.usuario);
      return true;
    }));
  }

  createUser(user: User) {

    let url = URL_SERVICES + '/usuario';
    return this.http.post(url, user).pipe(map((res: any) => {

      Swal.fire({
        title: 'User Created!',
        text: user.email,
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      });
      return res.user;
    }));

  }

  updateUser(user: User) {

    let url = URL_SERVICES + '/usuario/' + user._id;
    url += '?token=' + this.token;

    return this.http.put(url, user).pipe(map((res: any) => {

      if (user._id === this.user._id) {
        this.setStorage(res.usuario._id, this.token, res.usuario);
      }


      Swal.fire({
        title: 'User Updated!',
        text: user.email,
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      });

      return true;

    }));

  }

  changeImage(file: File, id: string) {

    this._uploadFileService.uploadFile(file, 'usuarios', id)
      .then((res: any) => {

        this.user.img = res.usuario.img;

        Swal.fire({
          title: 'Picture Updated!',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false
        });

        this.setStorage(id, this.token, this.user);

      })
      .catch(res => {

        console.error(res);

      });

  }

  loadUsers(desde: number = 0) {

    let url = URL_SERVICES + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

  seatchUSers(term: string) {

    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + term;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.usuarios));

  }

  deleteUser(id: string){
    
    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
    
  }

}
