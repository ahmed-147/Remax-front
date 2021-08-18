import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';

import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string ;
  passwd : string ;

  constructor(private acouuntServ : AccountService, private router: Router ) {
    this.username="";
    this.passwd="";
  }

  ngOnInit(): void {
  }

  loginFun(){
    this.acouuntServ.login(this.username, this.passwd).subscribe(data=>{
      this.router.navigate(['/dashboard']);
    },
    err=>{
      console.log('http ',err);
    })
  }


}
