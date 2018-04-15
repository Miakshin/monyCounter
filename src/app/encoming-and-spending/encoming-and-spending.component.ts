import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';
import { take } from 'rxjs/operators';

import { CommonService } from '../common.service';
import { Cell } from '../cells/cell/cell'

@Component({
  selector: 'app-encoming-and-spending',
  templateUrl: './encoming-and-spending.component.html',
  styleUrls: ['./encoming-and-spending.component.css']
})
export class EncomingAndSpendingComponent implements OnInit {

  spendingReports: object[];
  encomingReports: object[];
  activeTax: string[];
  activCells: string[];
  activeCurancy: any[];
  spendingTypes: any[];
  cells: Cell[];
  serchFlag: string;
  lastTenRepeat: number = 1;
  now: number;

  serchFormGroup: FormGroup;

  constructor(private commonService: CommonService) {
    this.serchFlag = "last ten";

    this.serchFormGroup = new FormGroup({
      "since" : new FormControl("", Validators.required),
      "for" : new FormControl("", Validators.required)
    })
 }

 ngOnInit():void{
   this.getDate();
   this.getData();
   this.getDataSettings();
   this.commonService.currentCellsData
    .subscribe(cells => {
      if(cells){
        this.cells = cells}
   })
 }

  getData(){
    switch(this.serchFlag){
      case "last ten":
      this.commonService.currentEncomingData
      .pipe(take(10*this.lastTenRepeat))
        .subscribe(encomings => {
          if(encomings){
            this.encomingReports = encomings
          };
        })
      this.commonService.currentSpendingData
      .pipe(take(10*this.lastTenRepeat))
        .subscribe(spendings => {
          if(spendings){
            this.spendingReports = spendings
          };
        })
      break;
      case "by date":
      let data = {
        since: Date.parse(this.serchFormGroup.value.since),
        for: Date.parse(this.serchFormGroup.value.for)
      }
      this.commonService.getReportsByTypeFlag("encoming", this.serchFlag, data)
      .subscribe((data)=>{
        this.encomingReports = data;
        })
      this.commonService.getReportsByTypeFlag("spending", this.serchFlag, data)
      .subscribe((data)=>{
        this.spendingReports = data;
        })
      break;
      case "all":
      this.commonService.currentEncomingData
        .subscribe(encomings => {
          if(encomings){
            this.encomingReports = encomings};
        })
      this.commonService.currentSpendingData
        .subscribe(spendings => {
          if(spendings){
            this.spendingReports = spendings};
        });
      break;
    }
  }

  getDate(){
    let now: number = Date.now()
    return this.now = now;
  }

  getDataSettings(){
    this.commonService.currentUserData
    .subscribe(user=>{
      if(user){
        this.activeTax = user.setings.activCells;
        this.activCells = user.setings.activCells;
        this.spendingTypes = user.setings.spendingTypes;
        this.activeCurancy = user.setings.activeCurancy.filter((item)=>{
          return item.checked === true
        })
      }
    })
  }

  getMoreReports(){
    this.lastTenRepeat ++;
    this.getData();
  }

  searchToggle(val){
    this.serchFlag = val;
    if(this.serchFlag === "by date"){
      this.spendingReports = [];
      this.encomingReports = [];
    }else{
      this.getData()
    }
  }


}
