import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute , private _CartServiceService:CartServiceService){}
  cartId:any= '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('id');
      }
    })
  }

  checkForm:FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  })




  handleForm():void {
    //  console.log(this.checkForm.value)

    this._CartServiceService.Checkout(this.cartId , this.checkForm.value).subscribe({
      next:(response) => {
        console.log(response)
        window.open(response.session.url)
      }


    })
  }

}
