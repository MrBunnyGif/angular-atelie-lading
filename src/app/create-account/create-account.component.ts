import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  form: FormGroup;
  hidePassword: boolean = true;
  validationMessages = {
    nome: {
      required: 'Insira um nome',
    },
    cpf: {
      required: 'Insira um valor de CPF',
      error: 'Valor inserido não válido',
    },
    senha: {
      required: 'Insira uma senha',
      minlenght: 'Mínimo de 6 caractéres',
    },
    ConfirmSenha: {
      required: 'Confirme a senha',
      minlenght: 'Mínimo de 6 caractéres',
    },
    grupoSenhas: {
      naoConfirmam: 'As senhas não são iguais'
    },
    email: {
      required: 'Insira um endereço de e-mail',
      error: 'Endereço de e-mail não válido',
    }
  }
  @ViewChild('nome') primeiroCampo: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setForms();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.primeiroCampo.nativeElement.focus(), 300);
  }

  setForms() {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      cpf: ['', [
        Validators.required,
      ]],
      senha: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmSenha: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      empresa: [''],
      classificacao: [''],
    });
  }

  register() {
    if (this.form.invalid)
      return
    alert('cadastrado com sucesso')
  }
}
