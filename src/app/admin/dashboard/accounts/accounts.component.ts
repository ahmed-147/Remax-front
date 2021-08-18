import { IAccount } from './../../../model/interface/iaccount';
import { AccountService } from './../../../service/account.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';



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
  updateImg: any;
  idEdit: number;
  idReset: number;
  accounts: IAccount[];
  resetElement: boolean = false;
  updateElement: boolean = false;
  
  hosttURL = environment.apiUrl
  port = environment.port
  imgDirectory: string = `${this.hosttURL}:${this.port}`;

  @ViewChild('accountView') accountView: ElementRef;
  @ViewChild('addaccountform') addaccountfrom: ElementRef;
  @ViewChild('updateaccountform') updateaccountform: ElementRef;
  @ViewChild('resetpasswordaccountform') resetpasswordaccountform: ElementRef;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,) {
    this.addAccountForm = this.fb.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0-9]*$")]],
    }, {
      validator: this.MustMatch('password', 'password1')
    });


    this.updateAccountForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0-9]*$")]],
    });

    this.resetPasswordAccountForm = this.fb.group({
      password: ['', [Validators.required]],
      password1: ['', [Validators.required]],
    }, {
      validator: this.MustMatch('password', 'password1')
    });
  }
  comparePassword() {
    return this.addAccountForm.get('password').value == this.addAccountForm.get('password1').value
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.getAccounts();
  }
  getAccounts() {
    this.accountService.getAllAccounts().subscribe(data => {
      console.log(data);
      this.accounts = data

    },
      err => {
        console.log(err);

      })
  }
  loadImg(event: any) {
    this.img = event.target.files[0]

  }
  updateAccountImg(img: any) {
    this.updateImg = img.target.files[0]

  }
  editAccount(accountdetails: IAccount) {
    this.updateElement = true;
    this.idEdit = accountdetails.id;
    this.updateAccountForm.patchValue({
      first_name: accountdetails.first_name,
      last_name: accountdetails.last_name,
      phone: accountdetails.phone,

    });
    this.updateaccountform.nativeElement.click();

  }
  resetUpdateForm() {
    this.updateElement = false;
    this.idEdit = 0;
    this.updateAccountForm.patchValue({
      first_name: '',
      last_name: '',
      phone: '',

    });
    this.updateImg = undefined;
    this.accountView.nativeElement.click();
  }

  deleteFun(accountId) {

    this.accountService.deleteAccountById(accountId).subscribe(data => {
      this.getAccounts();
    },
      err => {
        console.log(err);
      });

  }
  saveAccount() {
    const formdata = new FormData();
    formdata.append("username", this.addAccountForm.get('username').value);
    formdata.append("password", this.addAccountForm.get('password').value);
    formdata.append("first_name", this.addAccountForm.get('first_name').value);
    formdata.append("last_name", this.addAccountForm.get('last_name').value);
    formdata.append("phone", this.addAccountForm.get('phone').value);
    if (this.img) {
      formdata.append("img", this.img);
    }

    this.accountService.signup(formdata).subscribe(data => {
      this.accounts.push(data);
      this.accountView.nativeElement.click();
    },
      err => {
        console.log(err.detail);
      });


  }
  updateAccount() {
    const formdata = new FormData();
    formdata.append("first_name", this.updateAccountForm.get('first_name').value);
    formdata.append("last_name", this.updateAccountForm.get('last_name').value);
    formdata.append("phone", this.updateAccountForm.get('phone').value);
    if (this.updateImg) {
      formdata.append("img", this.updateImg);
    }

    this.accountService.updateAccount(this.idEdit, formdata).subscribe(data => {
      this.getAccounts();
      this.resetUpdateForm();
    },
      err => {
        console.log(err.detail);
      });

  }
  resetPasswordForm() {
    this.resetElement = false;
    this.idReset = 0;
    this.resetPasswordAccountForm.patchValue({
      password: '',
      password1: '',


    });
    this.accountView.nativeElement.click();
  }
  resetAccountPassword(accountdetails: IAccount) {
    this.resetElement = true;
    this.idReset = accountdetails.id;
    this.resetpasswordaccountform.nativeElement.click();
  }
  resetPassword() {
    const formdata = new FormData();
    formdata.append("password", this.resetPasswordAccountForm.get('password').value);

    this.accountService.updateAccount(this.idReset, formdata).subscribe(data => {
      this.getAccounts();
      this.resetPasswordForm();
    },
      err => {
        console.log(err.detail);
      });
  }

}
