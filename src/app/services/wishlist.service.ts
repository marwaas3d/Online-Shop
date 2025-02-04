import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  userToken:any = {
    token: localStorage.getItem('_token'),
  };



  addWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      productId : productId
    },
    {
      headers: this.userToken
    }
  )
  }


  getWishlist():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        headers: this.userToken
      }
    )
  }


  removeWish(idItem:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${idItem}`,
      {
        headers: this.userToken
      }
    )
  }
}
