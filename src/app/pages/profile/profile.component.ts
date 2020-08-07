import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadImage: File;
  imageTemp: any;

  constructor(public _userService: UserService) {

    this.user = this._userService.user;

  }

  ngOnInit(): void {
  }

  save(user: User) {
    this.user.nombre = user.nombre;

    if (!this.user.google) {
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user).subscribe();
  }

  imageSelection(file: File) {

    if (!file) {
      this.uploadImage = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {

      Swal.fire({
        title: 'Not an image!',
        text: 'Selected file is not an image',
        icon: 'error',
        timer: 2500,
        showConfirmButton: false
      });

      this.uploadImage = null;
      return;

    }

    this.uploadImage = file;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.imageTemp = reader.result;

  }

  changeImage() {

    this._userService.changeImage(this.uploadImage, this.user._id);

  }

}
