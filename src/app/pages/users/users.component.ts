import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  desde: number = 0;
  total: number = 0;


  loading: boolean = true;

  constructor(public _userService: UserService, public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {

    this.loadUsers();

    this._modalUploadService.notification.subscribe( res => this.loadUsers());

  }

  showModal(id: string){
    this._modalUploadService.showModal(id, 'usuarios');
  }

  loadUsers() {

    this.loading = true;

    this._userService.loadUsers(this.desde)
      .subscribe((res: any) => {

        this.total = res.total;
        this.users = res.usuarios;
        this.loading = false;

      })

  }

  changePagination(value: number) {

    let desde = this.desde + value;

    if (desde >= this.total) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += value;
    this.loadUsers();

  }

  searchUser(term: string) {

    if (term.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.seatchUSers(term)
      .subscribe((users: User[]) => {
        this.users = users;
        this.loading = false;
      })

  }

  deleteUser(user: User) {

    if (user._id === this._userService.user._id) {

      Swal.fire({
        title: 'No se puede borrar!',
        text: 'El ususario no se puede borrar a sí mismo',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Seguro?',
      text: "No podrás recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Usuario eliminado',
          'success'
        )

        this._userService.deleteUser(user._id)
          .subscribe( res => {
            console.log(res);
            this.loadUsers();
          })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }

  saveUser(user: User){
    
    this._userService.updateUser(user).subscribe();

  }


}
