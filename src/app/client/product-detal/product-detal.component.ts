import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detal',
  templateUrl: './product-detal.component.html',
  styleUrls: ['./product-detal.component.css']
})
export class ProductDetalComponent implements OnInit {

  myThumbnail="../../../assets/img-ad/store1.webp";
  myFullresImage="../../../assets/img-ad/store1.webp";

  constructor() { }

  ngOnInit(): void {
  }


}
