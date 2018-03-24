import { Component } from '@angular/core';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent{
  loginFormGroup : FormGroup;

  constructor() {
  this.loginFormGroup =  new FormGroup({
    "login": new FormControl("", [
      Validators.required,
      Validators.pattern(" /^[a-z0-9_-]{3,16}$/")
    ]),
    "password": new FormControl("",[
      Validators.required,
      Validators.pattern("/^[a-z0-9_-]{6,18}$/")
    ]),
    "isRemember": new FormControl("")
    });  }


}
