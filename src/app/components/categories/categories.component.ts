import { Component, OnInit } from '@angular/core';
import { ECommerceDataService } from '../../services/e-commerce-data.service';
import { NgFor } from '@angular/common';
import { RouterLink} from '@angular/router';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor,RouterLink], 
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'], 
})
export class CategoriesComponent implements OnInit {
  constructor(private _ECommerceDataService: ECommerceDataService) {}
  categories : any[] = []

  ngOnInit(): void {
    this._ECommerceDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        console.log(this.categories);

      }
    })



  }
}
