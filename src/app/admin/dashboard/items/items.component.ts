import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/model/interface/ibrand';
import { ICategory } from 'src/app/model/interface/icategory';
import { IItem } from 'src/app/model/interface/iitem';
import { ItemImgs } from 'src/app/model/interface/item-imgs';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { ItemImgsService } from 'src/app/service/item-imgs.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { element } from 'protractor';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items : IItem[];
  categories : ICategory[];
  brands : IBrand[];
  images : ItemImgs[] ;
  img: any;
  id: any =0;
  imgDirectory : string = 'http://localhost:8000';
  itemForm:FormGroup;

  @ViewChild('itemform') itemfrom: ElementRef;
  @ViewChild('itemView') itemView: ElementRef;



  constructor(private itemServ : ItemServiceService, 
    private brandServ : BrandServiceService , 
    private categServ : CategoryServiceService,
    private itemImgServ : ItemImgsService,
    private fb :FormBuilder) 
    {
      this.itemForm = this.fb.group({
        name:['',[Validators.required]],
        quantity:['',[Validators.required]],
        price:['',[Validators.required]],
        category:['',[Validators.required]],
        details:['',[Validators.required, Validators.minLength(50)]],
        brand:[''],
        discount:[''],
       

      });
    
  
    }

  ngOnInit(): void {
    this.fillTableData()
  }

  // items fin 
  editItem(item:IItem){
    this.id = item.id;
    this.itemForm.patchValue({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      category: item.category,
      details:item.details,
      brand:item.brand,
      discount: item.discount,
    });
    this.getImgByItemID();
    // = "nav-link active";
    // this.itemView.nativeElement.className = "nav-link";
    this.itemfrom.nativeElement.click();

    
  }

  saveItem(){
    let item:IItem = this.itemForm.value
    console.log(item);
    if (! this.id){
          this.itemServ.addItem(item).subscribe(data=>{
            this.items.push(data);
            this.id = data.id
            
          },
          err=>{
            console.log(err.detail);
          });
    
    }
    else {
      this.itemServ.updateItem(this.id, item).subscribe(data=>{
        this.fillTableData();
      },
      err=>{
        console.log(err.detail);
      });

    }

  }

  deleteFun(itemId){
    this.itemServ.deleteItemById(itemId).subscribe(
    data=>{
      this.fillTableData()
      this.resetValues()
    },
    err=>{
      console.log(err);
    });
    
  }

  //---------------

  fillTableData(){
    this.itemServ.getAllItems().subscribe(data=>{
      this.items = data;
    },
    err=>{
      console.log(err.detail);
    });

    this.categServ.getAllCategories().subscribe(data=>{
      this.categories = data;
    },
    err=>{
      console.log(err);
    });

    this.brandServ.getAllBrands().subscribe(data=>{
      
      this.brands = data;
     
    },
    err=>{
      console.log(err.detail);
      
    });
  }

  getCategNameByID(cateId):any{
    let cateName = this.categories?.find(element =>{return element.id== cateId } )
    if (cateName){
      return cateName.name
    }
    else {
      return 'No Category'
    }
    
  }

  getBrandNameByID(brandId) : any {
    let brandName = this.brands?.find(element =>{return element.id== brandId } )
    if (brandName){
      return brandName.name
    }
    else {
      return 'No brand'
    }
  }

  resetValues(){
    this.id = 0;
    this.itemForm.patchValue({
      name:'',
      quantity: 0,
      price: 0,
      category:'',
      details:'',
      brand:'',
      discount: 0,
    });
    this.images = [];
      
  }
//--------------------------
  loadImg(event :any){
    this.img = event.target.files[0]
  }

  deleteImg(imgId){
    this.itemImgServ.deleteItemImgById(imgId).subscribe(data=>{
      this.getImgByItemID()
    },
    err=>{
      console.log(err.detail);
    });
  }
  addImg(){
    const ItemImg= new FormData();
    ItemImg.append("item",this.id);
    ItemImg.append("img",this.img);

    this.itemImgServ.addItemImgs(ItemImg).subscribe(data=>{
      
      this.getImgByItemID()
    },
    err=>{
      console.log(err.detail);
    });

  }

  getImgByItemID(){
    this.itemImgServ.getAllItemImgsByItemId(this.id).subscribe(
      data =>{
        this.images = data;
      },
      err=>{
        console.log(err);
      });
  }


  

}
