import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  eyeIcon: string = 'visibility';
  @ViewChild('cpf') primeiroCampo: ElementRef;

  constructor() { }

  ngOnInit(): void { }
  
  togglePass() {
    this.hidePassword = !this.hidePassword;
    !this.hidePassword? this.eyeIcon = 'visibility_off' : this.eyeIcon = 'visibility';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.primeiroCampo.nativeElement.focus(), 300);
  }
}
