import { Component } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-updatedata',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './updatedata.component.html',
  styleUrl: './updatedata.component.scss'
})
export class UpdatedataComponent {
  constructor(private _CartServiceService:CartServiceService){}
  isCorrect:boolean = false;
  isError: boolean = false;
  Error:string = '';

  update:FormGroup = new FormGroup({
    name :new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('',[Validators.required ,Validators.email]),
    phone: new FormControl('',[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })



  updateDataInfo():void{
    if(this.update.valid){
      const name = this.update.get('name')?.value;
      const email = this.update.get('email')?.value;
      const phone = this.update.get('phone')?.value;

    this._CartServiceService.updateInfo(name, email, phone).subscribe({
      next: (response)=>{
        console.log(response);
        if(response.message = "success"){
          this.isCorrect = true ;
        }
      },

      error: (err)=>{
        console.log(err)
        this.isError = true;
        this.Error = err.error.errors.msg;
      }
    })
  }
}
}