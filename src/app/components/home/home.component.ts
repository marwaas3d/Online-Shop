import { RouterLink, RouterModule } from '@angular/router';
import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ECommerceDataService } from '../../services/e-commerce-data.service';
import { CurrencyPipe, NgFor,NgIf } from '@angular/common';
import { CutTextPipe } from '../../cut-text.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartServiceService } from '../../services/cart-service.service';
import { WishlistService } from '../../services/wishlist.service';
import { SearchPipe } from '../../search.pipe';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CurrencyPipe,
    CutTextPipe,
    RouterLink,
    CarouselModule,
    RouterModule,
    SearchPipe,
    FormsModule
    ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  welcomeMsg: string = '';
  products:any[] = [];
  categories:any[] = [];
  addedToCart:string = '';
  isAdded:boolean = false;

  isWish:boolean = false;
  wishMsg:string ='';

  term:string ='';

  constructor(private _AuthService: AuthService ,
    private _ECommerceDataService:ECommerceDataService,
    private _CartServiceService:CartServiceService,
    private _WishlistService:WishlistService
  ) {  }
  /************************************************************* */
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 1000,
    autoplayHoverPause: true,


    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };
    /************************************************************* */

  ngOnInit():void{
    this._AuthService.userDetails();
    this.welcomeMsg = this._AuthService.decode?.name;


/********************************************************************* */
    this._ECommerceDataService.getProducts().subscribe({
      next:(response)=>{
         this.products = response.data;
        //  console.log(response);
      },
      error:(err)=>{
        // console.log(err);
      }
    })
/********************************************************************* */
    this._ECommerceDataService.getAllCategories().subscribe({
      next: (response) =>{
        // console.log(response);
        this.categories = response.data;
      },
      error: (err) =>{
        // console.log(err);
      },
    })





}



/********************************************************************* */
addProduct(id:string):void{
  this._CartServiceService.addToCart(id).subscribe({
    next:(response)=>{
      // console.log(response);
      this.addedToCart = response.message;
      this.isAdded =true;


      this._CartServiceService.cartNumber.next(response.numOfCartItems);//number on shopping icon

    }
  })
  this.isAdded =false;
}

/*************************************************** */
addWish(id:string):void{
  this._WishlistService.addWishlist(id).subscribe({
    next: (response)=>{
      // console.log(response);
      this.isWish=true;
      this.wishMsg = response.message;
    }
  })
  this.isWish=false;
}
}

