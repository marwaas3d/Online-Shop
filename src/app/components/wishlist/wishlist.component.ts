import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor , NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  constructor(private _WishlistService : WishlistService){}
  data:any[] = [];
  isremoved:boolean=false;
  removeMsg:string ='';

  ngOnInit(): void {
      this._WishlistService.getWishlist().subscribe({
        next:(response)=>{
          // console.log(response.data);
          this.data = response.data;
        }
      })
  }


  removeItem(id:string):void{
    this._WishlistService.removeWish(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.data = this.data.filter(item => item._id !== id);

        this.isremoved = true;
        this.removeMsg = response.message;
      }
    })

    this.isremoved = false;

  }







}
