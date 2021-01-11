import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreatedComponent } from '../dialogs/created/created.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('name') primeiroCampo: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  empresa = "";
  classificacao = "";
  hidePassword: boolean = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.required, Validators.minLength(6)]);
  confirmSenha = new FormControl('', [Validators.required, Validators.minLength(6), this.verifyPassword()]);
  nome = new FormControl('', [Validators.required]);
  CPF = new FormControl({ value: null, disabled: false }, this.isValidCpf());

  constructor(
		public dialog: MatDialog,

  ) { }

  ngOnInit(): void { }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Insira um endereço de e-mail';
    }
    return this.email.hasError('email') ? 'O e-mail não é válido' : '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.primeiroCampo.nativeElement.focus(), 300);
  }

  isValidCpf() {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else {
          return { cpfNotValid: true };
        }
      }
      return null;
    };
  }

  verifyPassword() {
    return (control: AbstractControl): Validators => {
      const confirmSenha = control.value;
      if (this.senha.value != confirmSenha) {
        return { passwordNotValid: true }
      }
      else {
        return null
      }
    }
  }

  verifyForm() {
    return this.nome.invalid || this.email.invalid || this.CPF.invalid || this.senha.invalid || this.confirmSenha.invalid
  }

  register() {
    if (!this.verifyForm()) {
      const dados = {
        'Nome': this.nome.value,
        'E-mail': this.email.value,
        'CPF': this.CPF.value,
        'Senha': this.senha.value,
        'Empresa': this.empresa,
        'Classificação': this.classificacao,
      }
      const currentDialog = this.dialog.open(CreatedComponent);
    }
    else
      return
  }
}
