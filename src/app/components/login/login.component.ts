import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthService: AuthService ,private _Router: Router) {}

  errorMsg:string = '';
  isExist:boolean = false;
  forgetPass: string = '';
  doForget:boolean = false ;


  logInForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required ,Validators.email]),
    password: new FormControl('',[Validators.required ,Validators.pattern(/^\w{6,}$/)  ]),
  });

  handleLogin(){
    this._AuthService.LogInForm(this.logInForm.value).subscribe({
      next: (response)=>{

        if(response.message == 'success'){
          localStorage.setItem('_token',response.token)

          this._Router.navigate(['/home'])
          response.token;
        }
      },
      error: (err)=>{
        this.isExist = true;
        this.errorMsg = err.error.message;
      }
    });
    
  }



  forgetPassword(email:any): void {
    this._AuthService.forgetPassword(email).subscribe({
      next: (response) => {
        console.log(response);
        this.forgetPass = response.message;
        this.doForget = true ;
      }
    })
  }
}
