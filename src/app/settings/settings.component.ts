import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { User } from '../User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  login: string = "admin";
  activeLink :string = "account";
  user: User[];
  loansFromCells: boolean ;
  isCreateCurancyOpened: boolean = false;
  isCreateTypeOpened: boolean = false;

  curancyFormGroup : FormGroup;
  nameFormGroup : FormGroup;
  passwordFormGroup : FormGroup;
  typeFormGroup: FormGroup;

  constructor(private commonService: CommonService) {
    this.curancyFormGroup = new FormGroup({
      "name": new FormControl("", [
        Validators.required,
        Validators.pattern("[^a-zA-z]{3,4}")
      ]),
      "checked" : new FormControl(true)
    })

    this.nameFormGroup = new FormGroup({
      "newName": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,30}")
      ])
    })

    this.passwordFormGroup = new FormGroup({
      "newPass": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
      "currentPass": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
      "confirmPass": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
    })

    this.typeFormGroup= new FormGroup({
      "name": new FormControl("", [
        Validators.required,
        Validators.pattern("[^a-zA-z]{2,18}")
      ]),
      "color" : new FormControl(true)
    })
  }

  ngOnInit() {
    this.getSettins();
    this.loansFromCells= true;
  }

  getSettins(){
    this.commonService.getUserByLogin(this.login)
      .subscribe(user=>{
        this.user = user;
        console.log(this.user);
      })
  }

  pick(event){
    this.activeLink = event.target.name;
    let aNavs = document.querySelectorAll("[class ^= nav-link]");
    for(let i=0; i<aNavs.length; i++){
      aNavs[i].className="nav-link"
    }
    event.target.className = "nav-link active"
  }

  onCheckedChange(event){
    let data={value: event.target.name}
    this.commonService.changeSettings(this.login, "activeCurancy", data)
    .subscribe(console.log)
  }

  createCurancy(){
    let data = {
      name: this.curancyFormGroup.value.name,
      checked: this.curancyFormGroup.value.checked
    }
    this.commonService.changeSettings(this.login, "createCurancy", data)
    .subscribe(()=>{
      this.curancyFormGroup.reset();
      this.getSettins();
      this.isCreateCurancyOpened = false;
    })
  }

  deleteCurancy(name){
    let data = { value: name };
    this.commonService.changeSettings(this.login, "deleteCurancy", data)
    .subscribe(()=>{
      this.getSettins();
    })
  }

  onChangeAllowsCell(){
    this.commonService.changeSettings(this.login, "changeAllowsCell", "no data")
    .subscribe(()=>console.log("value changed"))
  }

  changeName(){
    let data = { name: this.nameFormGroup.value.newName};
    console.log(data);
    this.commonService.changeSettings(this.login, "changeName", data)
    .subscribe(()=>{
      this.nameFormGroup.reset()
      console.log("name value changed")
      this.getSettins()})
  }

  changePassword(){
    if(this.passwordFormGroup.value.newPass
      === this.passwordFormGroup.value.confirmPass){
        let data = {
          newPass : this.passwordFormGroup.value.newPass,
          currentPass: this.passwordFormGroup.value.currentPass
        }
        console.log(data)
        this.commonService.changeSettings(this.login, "changePassword", data)
        .subscribe(()=>{
          this.passwordFormGroup.reset()
          console.log("password value changed")
          this.getSettins()})
      }
  }

  createType(){

  }

  onChangeTypeColor(){

  }

}
