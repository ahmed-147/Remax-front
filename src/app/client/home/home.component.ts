import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/model/interface/icategory';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { IBrand } from 'src/app/model/interface/ibrand';
import { element } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories : ICategory[];
  brands : IBrand[];

  constructor(
    private categServ : CategoryServiceService,
    private brandServ : BrandServiceService ) { }

  ngOnInit(): void {
    this.brandServ.getAllBrands().subscribe(
      data =>{
        this.brands = data;
      },
      err => {
        console.log(err);
      }
    );
    this.categServ.getAllCategories().subscribe(
      data =>{
        this.categories = data;
       
      },
      err => {
        console.log(err);
      }
    );
  }

  getBrands():IBrand[]{
    if (this.brands?.length >= 8){
      return this.brands.slice( 0, 8) ;
    }
    else
    {
      return this.brands ;
    }
  }


}
