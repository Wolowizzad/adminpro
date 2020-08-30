import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFileService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  uploadImage: File;
  imageTemp: any;

  constructor(public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.uploadImage = null;
    this.imageTemp = null;
    this._modalUploadService.hideModal()
  }

  uploadImages() {
    this._uploadFileService.uploadFile(this.uploadImage, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(res => {
        this._modalUploadService.notification.emit(res);
        this.closeModal();
      })
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

}
