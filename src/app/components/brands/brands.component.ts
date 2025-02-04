import { Component, OnInit } from '@angular/core';
import { ECommerceDataService } from '../../services/e-commerce-data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgFor],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  constructor(private _ECommerceDataService: ECommerceDataService){}

  allBrands:any[]=[];


  ngOnInit(): void {
    this._ECommerceDataService.getAllBrands().subscribe({
      next: (response)=>{
        this.allBrands = response.data;
        console.log(this.allBrands);
      }
    })
  }

}
