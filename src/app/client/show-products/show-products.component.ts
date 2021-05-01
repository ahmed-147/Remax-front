import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
  regex : RegExp = new RegExp('/dashboard/*');
  regexlog : RegExp = new RegExp('/login');

  type : number = 0;
  filter : number = 0;
  selectType : number = 0 ;
  selectfilterId : number =0;

  constructor(private router : Router, private _activedRoute : ActivatedRoute ) { }

  ngOnInit(): void {
    this.type = this._activedRoute.snapshot.params["typeid"];
    this.filter = this._activedRoute.snapshot.params["fid"];

    console.log(this.type);
    console.log(this.filter);
  }

  getfilter(selected:any){
    this.selectfilterId = selected?.filterId;
    this.selectType = selected?.type;
  }

  

}
