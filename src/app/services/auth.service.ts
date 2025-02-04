import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  RegisterForm(userData: Object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData);
  }


  LogInForm(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData)
  }

  decode:any;
  userDetails():void{
    const encode = localStorage.getItem('_token');
    if(encode){
     this.decode = jwtDecode(encode)
    }
  }


  forgetPassword(email:string): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` ,
    {
        email: email
    }
    )
  }



}
