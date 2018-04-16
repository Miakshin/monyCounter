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

  ngOnInit():void{
    this.commonService.currentUserData
      .subscribe(user => this.user = user );
  }

  pick(event):void{
    this.activeLink = event.target.name;
    let aNavs = document.querySelectorAll("[class ^= nav-link]");
    for(let i=0; i<aNavs.length; i++){
      aNavs[i].className="nav-link"
    }
    event.target.className = "nav-link active"
  }

  onCheckedChange(event):void{
    let data={value: event.target.name}
    this.commonService.changeSettings(this.login, "activeCurancy", data)
    .subscribe()
  }

  createCurancy():void{
    let data = {
      name: this.curancyFormGroup.value.name,
      checked: this.curancyFormGroup.value.checked
    }
    this.commonService.changeSettings(this.login, "createCurancy", data)
    .subscribe(()=>{
      this.curancyFormGroup.reset();
      this.commonService.getUserByLogin(document.cookie.slice(6))
        .subscribe((user:User) =>this.commonService.refreshUser(user))
      this.isCreateCurancyOpened = false;
    })
  }

  deleteCurancy(name):void{
    let data = { value: name };
    this.commonService.changeSettings(this.login, "deleteCurancy", data)
    .subscribe(()=>{
      this.commonService.getUserByLogin(document.cookie.slice(6))
        .subscribe((user:User) =>this.commonService.refreshUser(user))
    })
  }

  onChangeAllowsCell():void{
    this.commonService.changeSettings(this.login, "changeAllowsCell", "no data")
    .subscribe()
  }

  changeName():void{
    let data = { name: this.nameFormGroup.value.newName};
    this.commonService.changeSettings(this.login, "changeName", data)
    .subscribe(()=>{
      this.nameFormGroup.reset()
      this.commonService.getUserByLogin(document.cookie.slice(6))
        .subscribe((user:User) =>this.commonService.refreshUser(user))
      })
  }

  changePassword():void{
    if(this.passwordFormGroup.value.newPass
      === this.passwordFormGroup.value.confirmPass){
        let data = {
          newPass : this.passwordFormGroup.value.newPass,
          currentPass: this.passwordFormGroup.value.currentPass
        }
        this.commonService.changeSettings(this.login, "changePassword", data)
        .subscribe(()=>{
          this.passwordFormGroup.reset();
          this.commonService.getUserByLogin(document.cookie.slice(6))
            .subscribe((user:User) =>this.commonService.refreshUser(user))
          })
      }
  }

  createType():void{
    let data = {
      name: this.typeFormGroup.value.name,
      color: this.typeFormGroup.value.color
    }
    this.commonService.changeSettings(this.login, "createSpendingType", data)
    .subscribe(()=>{
      this.typeFormGroup.reset();
      this.commonService.getUserByLogin(document.cookie.slice(6))
        .subscribe((user:User) =>this.commonService.refreshUser(user));
      this.isCreateTypeOpened = false;
    })
  }

  onChangeTypeColor(ev):void{
    let data = {
      name: ev.target.name,
      color: ev.target.value}
    this.commonService.changeSettings(this.login, "changeColor", data)
    .subscribe(()=>{
      this.commonService.getUserByLogin(document.cookie.slice(6))
        .subscribe((user:User) =>this.commonService.refreshUser(user));
      })
  }

  deleteType(name):void{
    let data = {
      name: name
    }
    this.commonService.changeSettings(this.login, "deleteSpendingType", data)
    .subscribe(()=>{
      this.commonService.getUserByLogin(document.cookie.slice(6))
        .subscribe((user:User) =>this.commonService.refreshUser(user));
    })
  }

}
