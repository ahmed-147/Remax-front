import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { IBrand } from 'src/app/model/interface/ibrand';
import { ICategory } from 'src/app/model/interface/icategory';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

 brands : IBrand[];
 categories : ICategory[];
 
 @Output() filter:EventEmitter<any> = new EventEmitter<any>();

  constructor( 
    private brandServ : BrandServiceService,
    private categoryServ : CategoryServiceService) { }

  ngOnInit(): void {

    this.categoryServ.getAllCategories().subscribe(
      data => {
        this.categories = data
      },
      err => {
        console.log(err)
      }
    );

    this.brandServ.getAllBrands().subscribe(
      data => {
        this.brands = data
      },
      err => {
        console.log(err)
      }
    );

  }

  testfun(){
    console.log('test')
  }
  
  selectfilter(type:number, filterId : number){
    this.filter.emit(
      {
        'type':type,
        'filterId': filterId
      });
  }

}
