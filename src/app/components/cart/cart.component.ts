import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import {  NgFor,NgIf } from '@angular/common';
import { RouterLink,Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartServiceService:CartServiceService , private _Router: Router){}
  cartData:any = {}
  isEmpty:boolean = false;

  ngOnInit(): void {
    this._CartServiceService.getCart().subscribe({
      next:(res)=>{
        this.cartData = res.data;


        localStorage.setItem('_userId',res.data.cartOwner)
      }
    });

    
    this._CartServiceService.getCart().subscribe({
      next:(response)=>{
        console.log(response)
      }
    })
  
    

  }

  deleteItem(id:string) : void {
    this._CartServiceService.deleteItem(id).subscribe({
      next:(response)=>{
        console.log(response)
        this.cartData =response.data;

        this._CartServiceService.cartNumber.next(response.numOfCartItems);
      }
    })
  }







  updateCount(id:string , countItem:number) :void {
    this._CartServiceService.updateQuantity(id , countItem).subscribe({
      next: (response) =>{
        console.log(response);
        this.cartData =response.data;

      },

      error: (err)=>{console.log(err)}
    })
  }

  clearAll() :void{
    this._CartServiceService.clearAll().subscribe({
      next : (response) => {
        console.log(response);
        this.cartData =response;
      }
    })
  }



  pay():void {
    if(this.cartData.totalCartPrice > 1){
      this._Router.navigate(['/payment',this.cartData._id])
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }

  }


}
