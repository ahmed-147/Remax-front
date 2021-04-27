import { IAccount } from './../../../model/interface/iaccount';
import { AccountService } from './../../../service/account.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';



@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  addAccountForm: FormGroup;
  updateAccountForm: FormGroup;
  resetPasswordAccountForm: FormGroup;
  img: any;
  accounts: IAccount[];
  imgDirectory : string = 'http://localhost:8000';
  
  @ViewChild('accountView') accountView: ElementRef;
  @ViewChild('addaccountform') addaccountfrom: ElementRef;
  @ViewChild('updateaccountform') updateaccountform: ElementRef;
  @ViewChild('resetpasswordaccountform') resetpasswordaccountform: ElementRef;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,) {
    this.addAccountForm = this.fb.group({
      username: ['', [Validators.required]],
      first_name: [''],
      last_name: [''],
      password: ['' , [Validators.required]],
      password1: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      
    });

  
    //this.updateAccountForm = this.fb.group({
     // first_name: [''],
     // last_name: [''],
     // phone: [''],
    //});

    //this.resetPasswordAccountForm = this.fb.group({
     // password: [''],
     // password1: [''],
    //});
  }

  ngOnInit(): void {
    this.getAccounts();
  }
  getAccounts(){
    this.accountService.getAllAccounts().subscribe(data=>{
      console.log(data); 
      this.accounts = data

       },
       err=>{
         console.log(err);
        
       })
  }
  loadImg(event :any){
    this.img = event.target.files[0]
    
  }
  deleteFun(accountId){
    
    this.accountService.deleteAccountById(accountId).subscribe(data=>{
    },
    err=>{
      console.log(err);
    });
    this.getAccounts();
    
  }
  saveAccount(){

  }
  
}
