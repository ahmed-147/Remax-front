import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IBrand } from 'src/app/model/interface/ibrand';
import { BrandServiceService } from 'src/app/service/brand-service.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: IBrand[];
  @ViewChild('newImg') newImg: ElementRef;
  imgDirectory : string = 'http://localhost:8000';
  name :string = '';
  img : any ;
  updateimg : any ;
  id : any= 0;

  constructor(private brandServ: BrandServiceService, private http: HttpClient  ) { }

  ngOnInit(): void {
    this.fillTableData()
  }
  
  updateFun(brand:IBrand){
    this.id = brand.id;
    this.name = brand.name;
    this.updateimg = false;
    this.newImg.nativeElement.value = null;
  }

  deleteFun(brandId){
    
    this.brandServ.deleteBrandById(brandId).subscribe(data=>{
      this.fillTableData();
    },
    err=>{
      console.log(err);
    });
    
  }

  newCategoryFun(event){
    if (! this.id){
      const formdata= new FormData();
      formdata.append("name",this.name);
      formdata.append("img",this.img);
      console.log(this.img);

      this.brandServ.addBrand(formdata).subscribe(data=>{
        this.brands.push(data);
        this.resetValues();
      },
      err=>{
        console.log(err.detail);
      });

    }
    else {
      const formdata= new FormData();
      formdata.append("name",this.name);
      if (this.updateimg){
        formdata.append("img",this.updateimg);
      }
      formdata.append("id",this.id);

      
      this.brandServ.updateBrand(this.id, formdata).subscribe(data=>{
        this.fillTableData();
        this.resetValues();
      },
      err=>{
        console.log(err.detail);
      });

    }
    

  }

  fillTableData(){
    this.brandServ.getAllBrands().subscribe(data=>{
      
      this.brands = data;
     
    },
    err=>{
      console.log(err.detail);
      
    });
  }

  resetValues(){
    this.name = '';
    this.img= null;
    this.id=0;
    this.newImg.nativeElement.value = null;
  }

  loadImg(event :any){
    if (this.id){
      this.updateimg = event.target.files[0]
    }
    this.img = event.target.files[0]
    console.log(this.img);
  }

}
