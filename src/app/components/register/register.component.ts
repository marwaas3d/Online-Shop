import { LoginComponent } from './../login/login.component';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormControlOptions } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService ,private _Router: Router) {}


  registerForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('',[Validators.required ,Validators.email]),
    password: new FormControl('',[Validators.required ,Validators.pattern(/^\w{6,}$/)  ]),
    rePassword: new FormControl(''),
    phone: new FormControl('',[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , { validators:[this.confirmPassword] } as FormControlOptions);


  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if(rePassword?.value == ''){
      rePassword.setErrors({required:true})
    }else if(password?.value !== rePassword?.value){
      rePassword?.setErrors({mismatch:true})
  }
        
  }
/**
handleRegister():void{
  console.log(this.registerForm.value);
}
*/
isLoading:boolean = false;
isExist:boolean = false;
errorMsg:string = '';

handleRegister(): void {
  this.isLoading = true;
  if (this.registerForm.valid) {
    this._AuthService.RegisterForm(this.registerForm.value).subscribe({
      next: (response) => {
        // console.log(response);
        if(response.message == 'success'){
          this._Router.navigate(['./login'])
        this.isLoading=false;
        }
      },
      error: (err) => {
        // console.error(err);
        this.isLoading=false;
        this.isExist = true;
        this.errorMsg = err.error.message;
      }
    });
  }
}

};


