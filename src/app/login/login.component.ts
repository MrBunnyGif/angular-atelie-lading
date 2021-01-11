import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreatedComponent } from '../dialogs/created/created.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  eyeIcon: string = 'visibility';
  @ViewChild('cpf') primeiroCampo: ElementRef;
  usuarios: any[] = JSON.parse(localStorage.getItem('users')) || [];
  usuario: string = '';
  senha: string = '';

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  togglePass() {
    this.hidePassword = !this.hidePassword;
    !this.hidePassword ? this.eyeIcon = 'visibility_off' : this.eyeIcon = 'visibility';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.primeiroCampo.nativeElement.focus(), 300);
  }

  login() {
    const usuario = this.usuarios.find(usuario => usuario.cpf == this.usuario)
    if (usuario) {
      if (usuario.password == this.senha)
        this.dialog.open(CreatedComponent, {
          data: {
            text: 'Usuário encontrado no sistema!'
          }
        });
      else
        this.dialog.open(CreatedComponent, {
          data: { text: 'Senha incorreta' }
        });
    }
    else
      this.dialog.open(CreatedComponent, {
        data: { text: 'Usuário não encontrado' }
      });
  }
}
