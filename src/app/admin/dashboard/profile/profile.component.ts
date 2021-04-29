import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/model/interface/iaccount';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user :IAccount

  constructor(private accountServ : AccountService,) { }

  ngOnInit(): void {
    this.accountServ.getCurrentAccount().subscribe(
      data => {
        this.user = data;
        
      },
      err => {
        console.log(err)
      }
    );
  }

}
