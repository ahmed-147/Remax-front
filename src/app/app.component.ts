import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'remax';
  routerStr: string;
  regex : RegExp = new RegExp('/dashboard/*');
  regexlog : RegExp = new RegExp('/login');
  // regex2 = new RegExp('/chech/*');
  constructor(private router : Router){
    
  }

  ngOnInit() {
    
  }

  checkUser(): boolean {
    this.routerStr = this.router.url;
    if(this.regex.test(this.routerStr) || this.regexlog.test(this.routerStr)){
      return false ;
    }
    else {
      
      return true ;
    }
    
  }
}
