import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit(): void {
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}


// images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

//   constructor(config: NgbCarouselConfig) {
//     config.interval = 2000;
//     config.keyboard = true;
//     config.pauseOnHover = true;
//    }