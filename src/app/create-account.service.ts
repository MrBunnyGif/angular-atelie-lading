import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(
    private http: HttpClient
  ) { }

  createAccount(data) {
    return this.http.post(`http://virtserver.swaggerhub.com/ateliedepropaganda/register/1.0.0/costumer`, data)
  }
}