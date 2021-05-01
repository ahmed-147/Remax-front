import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/model/interface/iitem';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { element } from 'protractor';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  items : IItem[];

  @Input() type: number;
  @Input() filter:  number;

  @Input() selectType: number;
  @Input() selectfilterId:  number;

  constructor(
    private itemServ : ItemServiceService) { }

  ngOnInit(): void {
    console.log(this.type + '' + this.filter)
    this.itemServ.getAllItems().subscribe(
      data => {
        this.items = data;
      },
      err => {
        console.log(err);
      });
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
    else
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
  }
}
