import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit,DoCheck {
 
  type : number = 0;
  filter : number = 0;
  selectType : number = 0 ;
  selectfilterId : number =0;

  constructor(private router : Router, private _activedRoute : ActivatedRoute ) {
    // this.type = this._activedRoute.snapshot.params["typeid"];
    // this.filter = this._activedRoute.snapshot.params["fid"];
   }

  ngOnInit(): void {
    
    console.log(this.type);
    console.log(this.filter);
  }

  ngDoCheck(){
    this.type = this._activedRoute.snapshot.params["typeid"];
    this.filter = this._activedRoute.snapshot.params["fid"];
  }

 
  getfilter(selected:any){
    this.selectfilterId = selected?.filterId;
    this.selectType = selected?.type;
  }

  

}
