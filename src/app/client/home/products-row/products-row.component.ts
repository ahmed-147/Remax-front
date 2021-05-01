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

  onSwiper(swiper) {
   
  }
  onSlideChange() {
    
  }

  getGroupItem(groupNum):IItem[]{
    let gropITem : IItem [] ;
    
    if (this.items?.length >= groupNum * 5 ){
      gropITem = this.items.slice( (groupNum - 1) * 5, groupNum * 5 );

    }
    else if (this.items?.length > ((groupNum - 1) * 5) )
    {
      let itemsNum = 5 - (this.items?.length - (groupNum - 1)* 5) ;
      if (groupNum == 1){
        gropITem = this.items;
      }
      else {
        gropITem = this.items.slice( ( (groupNum - 1) * 5) - itemsNum, this.items?.length ) ;
      }
      
    }
    else{
      gropITem = []
    }
    
    return gropITem
  }

}


// images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

//   constructor(config: NgbCarouselConfig) {
//     config.interval = 2000;
//     config.keyboard = true;
//     config.pauseOnHover = true;
//    }