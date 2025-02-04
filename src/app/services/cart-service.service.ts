import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private _HttpClient:HttpClient) { }
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  userToken:any = {
    token: localStorage.getItem('_token'),
  };

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId: id,
    },
    {
      headers: this.userToken,
    }
    )
  }

  getCart(): Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:this.userToken,
    })
  }

  deleteItem(id:string): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,
      {
        headers:this.userToken,
      }
    )
  }

  updateQuantity(id:string , countItem:number):  Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
          count: countItem
      },
      {
        headers:this.userToken,
      }
  );
  }

  clearAll(): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
     {
      headers:this.userToken
     })
  }

  Checkout(cartId:any , orderDetails:any): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: orderDetails
    }
    ,
      {
        headers:this.userToken,
      }
    )
  }


  updatePassword(currentPassword:string , password:string, rePassword:string): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        currentPassword : currentPassword,
        password : password,
        rePassword :  rePassword
      },
      {
        headers:this.userToken,
      }
    )
  }

  updateInfo(name:string , email:string ,phone:string):Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      {
        name: name,
        email: email,
        phone: phone
    },
    {
      headers:this.userToken,
    }
    
    )
  }





  getUserOrders(userId:any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }
  



}










