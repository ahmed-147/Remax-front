import {  Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/model/interface/icategory';
import { CategoryServiceService } from 'src/app/service/category-service.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : ICategory[] ;
  
  currntCateg : ICategory = { 'name': ''};
  name: string = "" ;
  parent : number = 0;
  id: number = 0 
  

  constructor(private categServ: CategoryServiceService) { 
    
  }

  ngOnInit(): void {
    this.fillTableData()
  }

  updateFun(category:ICategory){
    this.id = category.id;
    this.name = category.name;
    this.parent = category.parent;
    
  }

  deleteFun(categoryId){
    console.log(categoryId)
    this.categServ.deleteCategoryById(categoryId).subscribe(data=>{
    },
    err=>{
      console.log(err);
    });
    this.fillTableData()
    
  }

  newCategoryFun(){
    if (! this.id){
      this.currntCateg.name = this.name;
      this.currntCateg.parent = this.parent;
      this.categServ.addCategory(this.currntCateg).subscribe(data=>{
        this.categories.push(data);
        this.resetValues();
      },
      err=>{
        console.log(err.detail);
      });
    }
    else {
      this.currntCateg.name = this.name;
      this.currntCateg.parent = this.parent;
      this.categServ.updateCategory(this.id, this.currntCateg).subscribe(data=>{
        this.fillTableData();
        this.resetValues();
      },
      err=>{
        console.log(err.detail);
      });

    }
    

  }

  fillTableData(){
    this.categServ.getAllCategories().subscribe(data=>{
      
      this.categories = data;
    },
    err=>{
      console.log(err);
      
    });
  }

  resetValues(){
    this.name = '';
    this.parent=0;
    this.id=0;
  }

  parentCateg() : ICategory[]{
    if (!this.id) {
      return this.categories
    }
    else{
      return this.categories.filter(element => {return element.id < this.id })
    }
  }

}
