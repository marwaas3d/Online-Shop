import { Component } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updatepass',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './updatepass.component.html',
styleUrl: './updatepass.component.scss'
})
export class UpdatepassComponent {
  constructor(private _CartServiceService:CartServiceService , private _Router:Router){}


  updateForm:FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required ,Validators.pattern(/^\w{6,}$/)  ]),
    rePassword: new FormControl('',[Validators.required ,Validators.pattern(/^\w{6,}$/)  ]),
  })



  updatePass():void {
    if (this.updateForm.valid) {
      const currentPassword = this.updateForm.get('currentPassword')?.value;
      const password = this.updateForm.get('password')?.value;
      const rePassword = this.updateForm.get('rePassword')?.value;

      this._CartServiceService.updatePassword(currentPassword,password, rePassword).subscribe({
        next: (response) => {
          console.log(response);
          if(response.message == 'success'){
            this._Router.navigate(['./login'])
          }

        },
        error: (err) => {
          console.error( err);
        },
      });
    }
  }
}
