import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  eyeIcon: string = 'visibility';
  
  constructor() { }

  ngOnInit(): void { }
  
  togglePass() {
    this.hidePassword = !this.hidePassword;
    !this.hidePassword? this.eyeIcon = 'visibility_off' : this.eyeIcon = 'visibility';
  }
}
