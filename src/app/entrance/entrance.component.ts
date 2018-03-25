import { Component } from '@angular/core';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';
import { CommonService } from '../common.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent{
  loginFormGroup : FormGroup;

  constructor(private commonService: CommonService,
              private router: Router) {
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

    logIn(){
      console.log(this.loginFormGroup)
      const login = this.loginFormGroup.value.login;
      const password = this.loginFormGroup.value.password;
      console.log(login,password)
      this.loginFormGroup.reset();
      this.commonService.getUserByLogin("admin").
        subscribe(user=>{
          if(user.login === login && user.password === password){
            window.localStorage.setItem("login", user.login);
            // console.log(this.commonService.currentUser)
            this.router.navigate(["/main"])
          }
        })
    }
}
