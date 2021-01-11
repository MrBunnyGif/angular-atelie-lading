import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('name') primeiroCampo: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  senha = "";
  confirmSenha = "";
  empresa = "";
  classificacao = "";
  hidePassword: boolean = true
  errors = {
    email: false
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  nome = new FormControl('', [Validators.required]);
  // CPF = new FormControl('', [Validators.required]);
  CPF = new FormControl({ value: null, disabled: false }, this.isValidCpf());

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valInsira um endereço de e-mailue';
    }
    return this.email.hasError('email') ? 'O e-mail não é válido' : '';
  }

  constructor() { }

  ngOnInit(): void { }

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
}
