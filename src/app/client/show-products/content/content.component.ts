import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { IItem } from 'src/app/model/interface/iitem';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { element } from 'protractor';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { IBrand } from 'src/app/model/interface/ibrand';
import { ICategory } from 'src/app/model/interface/icategory';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, DoCheck {

  titel : string =''; 

  items : IItem[];
  barnd : IBrand;
  category : ICategory;

  @Input() type: number;
  @Input() filter:  number;

  @Input() selectType: number;
  @Input() selectfilterId:  number;

  constructor(
    private itemServ : ItemServiceService,
    private ctegServ : CategoryServiceService,
    private brandServ  : BrandServiceService
    ) { }

  ngOnInit(): void {
    this.itemServ.getAllItems().subscribe(
      data => {
        this.items = data;
      },
      err => {
        console.log(err);
    });
    if (this.type == 2){
      this.brandServ.getAllBrandsById(this.filter).subscribe(
        data => {
          this.titel = data.name;
        },
        err => {
          console.log(err);
      });
    }
    else if (this.type == 1){
      this.ctegServ.getAllCategoriesById(this.filter).subscribe(
        data => {
          this.titel = data.name;
        },
        err => {
          console.log(err);
      });
    }
    else{
      this.titel = 'All Products';
    }
   
  }

  ngDoCheck() {
    this.getContentItem()
  } 
  getContentItem(){
    if (this.type == 1){
      if (this.selectType == 0){
        return this.items?.filter(element => {return element.category == this.filter });
      }
      else if (this.selectType == 1){
        return this.items?.filter(element => {return element.category == this.filter && element.category == this.selectfilterId });
      }
      else if (this.selectType == 2){
        return this.items?.filter(element => {return element.category == this.filter && element.brand == this.selectfilterId });
      }

    }
    else if (this.type == 2)
    {
      if (this.selectType == 0){
        return this.items?.filter(element => {return element.brand == this.filter });
      }
      else if (this.selectType == 1){
        return this.items?.filter(element => {return element.brand == this.filter && element.category == this.selectfilterId });
      }
      else if (this.selectType == 2){
        return this.items?.filter(element => {return element.brand == this.filter && element.brand == this.selectfilterId });
      }
    }
    else if(this.type == 0)
    {
      if (this.selectType == 0){
        return this.items;
      }
      else if (this.selectType == 1){
        return this.items?.filter(element => {return element.category == this.selectfilterId });
      }
      else if (this.selectType == 2){
        
        return this.items?.filter(element => {return element.brand == this.selectfilterId });
      }
      
    }
  }

}
