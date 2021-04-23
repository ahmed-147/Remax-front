import {  Component, OnInit } from '@angular/core';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Swiper,
  Virtual,
  EffectFade,
  Autoplay,
  Controller,
  Thumbs
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade , Virtual, Autoplay, Controller, Thumbs ]);

// const swiper = new Swiper('swiper', {
//   speed: 1000,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
  
// });

@Component({
  selector: 'app-adslider',
  templateUrl: './adslider.component.html',
  styleUrls: ['./adslider.component.css']
})
export class ADsliderComponent implements OnInit {
  
  constructor() { }

  controlledSwiper: any;
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }
  ngOnInit(): void {
  }

  onSwiper(swiper) {
    // console.log(swiper);
  }
  onSlideChange() {
    // console.log('slide change');
  }

}
