import { Component, Input, OnInit } from '@angular/core';
import { IBrand } from 'src/app/model/interface/ibrand';
import { ICategory } from 'src/app/model/interface/icategory';
import { IItem } from 'src/app/model/interface/iitem';
import { ItemServiceService } from 'src/app/service/item-service.service';


import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade ]);

@Component({
  selector: 'app-products-row',
  templateUrl: './products-row.component.html',
  styleUrls: ['./products-row.component.css']
})
export class ProductsRowComponent implements OnInit {

  items : IItem [];
  itemsGrop : any [];


  @Input() category: ICategory;
  @Input() brand:  IBrand;

  constructor(private itemServ : ItemServiceService) { }

  ngOnInit(): void {
    if(this.category){
      this.itemServ.getItemsByCategortyId(this.category.id).subscribe(
        data => {
          this.items = data 
        },
        err => {
          console.log(err)
        });
    }
    if(this.brand){
      this.itemServ.getItemsByBrandId(this.brand.id).subscribe(
        data => {
          this.items = data 
        },
        err => {
          console.log(err)
        });
    }
  }


  getGroupItem(groupNum,cardNum):IItem[]{
    let gropITem : IItem [] ;
    if (this.items?.length >= groupNum * cardNum ){
      gropITem = this.items.slice( (groupNum - 1) * cardNum, groupNum * cardNum );
    }
    else if (this.items?.length > ((groupNum - 1) * cardNum) )
    {
      let itemsNum = cardNum - (this.items?.length - (groupNum - 1)* cardNum) ;
      if (groupNum == 1){
        gropITem = this.items;
      }
      else {
        gropITem = this.items.slice( ( (groupNum - 1) * cardNum) - itemsNum, this.items?.length ) ;
      }
      
    }
    else{
      gropITem = []
    }
    return gropITem
  }

  calculationGroups(){
    var grops = [];
    var subGrops=[];
    for (let i = 0; i < this.items?.length; i=i+2) {
      subGrops = this.items?.slice(i,i+2);
      if(subGrops.length === 2){
        grops.push(subGrops);
      } 
    }
    if(grops.length > 4){
      return grops.slice(0, 4)
    }else{
      return grops
    }
    
  }

  getItemsInXsSize(size):IItem[]{
    if(this.items?.length > size){
      return this.items?.slice(0, size)
    }else {
      return this.items
    }
  }

}


// images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

//   constructor(config: NgbCarouselConfig) {
//     config.interval = 2000;
//     config.keyboard = true;
//     config.pauseOnHover = true;
//    }