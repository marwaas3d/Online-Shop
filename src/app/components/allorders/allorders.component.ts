import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import {  NgFor,NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink ,NgFor , NgStyle],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  constructor(private _CartServiceService : CartServiceService){}
  order:any[] =[]

  ngOnInit(): void {

    const userId = localStorage.getItem('_userId')

    this._CartServiceService.getUserOrders(userId).subscribe({
      next: (response)=>{
        console.log(response)
        this.order = response;

      }
    })

}


}



