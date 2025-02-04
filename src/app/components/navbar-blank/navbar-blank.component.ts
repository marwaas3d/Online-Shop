import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive,Router } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';


@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent implements OnInit{
  constructor(private _router:Router , private _CartServiceService:CartServiceService){}
  cartCount:number = 0;

  ngOnInit(): void {
    this._CartServiceService.cartNumber.subscribe({
      next: (data)=>{
        this.cartCount = data;
      }
    })



    this._CartServiceService.getCart().subscribe({
      next: (response)=>{
        this.cartCount = response.numOfCartItems;
        this._CartServiceService.cartNumber.next(response.numOfCartItems)
      }
    })


    
  }



  signOut():void{
    this._router.navigate(['/login']);
    localStorage.removeItem('_token');
    localStorage.removeItem('_userId');
  }


}
