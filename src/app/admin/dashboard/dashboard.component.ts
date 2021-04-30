import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { IAccount } from './../../model/interface/iaccount';

import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  imgDirectory : string = 'http://localhost:8000';
  username : string ='';
  currentuser : IAccount;
  islogedin : boolean 
  constructor(
    private accountServ : AccountService,
    private router: Router 
    ) { }

  ngOnInit(): void {
    
    if (this.accountServ.isLoggedIn()){
      this.accountServ.getCurrentAccount().subscribe(
        data => {
          this.currentuser = data;
          
        },
        err => {
          console.log(err)
        }
      );
    }
    else{
      this.router.navigate(['/login']);
    }
    
  }

  logoutFun(){
    this.accountServ.logout();
    this.router.navigate(['/login']);
    
  }

}
