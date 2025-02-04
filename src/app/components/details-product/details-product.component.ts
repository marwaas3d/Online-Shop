import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECommerceDataService } from '../../services/e-commerce-data.service';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor ,NgIf} from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';






@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [CurrencyPipe,RouterModule,CarouselModule ,NgFor ,NgIf],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss'
})
export class DetailsProductComponent implements OnInit{
  constructor(private _ActivatedRoute: ActivatedRoute 
    , private _ECommerceDataService:ECommerceDataService,
    private _CartServiceService:CartServiceService
  ){}
  productId:any;
  productDetails:any={};
  imagesSlider:string[]=[];

  addedToCart:string = '';
  isAdded:boolean = false;

  ngOnInit():void{
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = param.get('id');
      },
      error: (err) => {
        console.log(err);
      }
    })

    this._ECommerceDataService.getSpecificProduct(this.productId).subscribe({
      next:(response)=>{
        this.productDetails = response.data;
        this.imagesSlider = this.productDetails.images;
        console.log(this.productDetails);
      },
      error:(err)=>{ console.log(err)}
    })

  }



  /************************************************************************ */

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
    items:1,
    nav: false
  }



  /************************** ADD TO CART************************** */
  addProduct(id:string):void{
    this._CartServiceService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.addedToCart = response.message;
        this.isAdded =true; 


        this._CartServiceService.cartNumber.next(response.numOfCartItems);
      }
    }
    )
  }
}
