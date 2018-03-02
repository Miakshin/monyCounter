import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CommonService } from '../common.service'

@Component({
  selector: 'app-encoming-and-spending',
  templateUrl: './encoming-and-spending.component.html',
  styleUrls: ['./encoming-and-spending.component.css']
})
export class EncomingAndSpendingComponent implements OnInit {

  spendingReports = [];
  encomingReports = [];

  encomingSum:number;
  spendingSum:number;

  constructor(private commonService: CommonService) { }

  getDate(){
    let now = new Date;
    return now
  }

  ngOnInit():void{
    this.getSpendingReports();
    this.getEncomingReports();
  }

  sendReport(type) :void{
    let form = eval(`document.forms.${type}`);
    let data
    if(type === "spending"){
      data = {
        date: Date.now(),
        amount: form.elements.amount.value,
        description : form.elements.description.value,
        currency : form.elements.currency.value
      };
    }else if(type === "encoming"){
      data = {
        date: Date.now(),
        amount: form.elements.amount.value,
        description : form.elements.description.value,
        currency : form.elements.currency.value,
        isTax: false
      };
    }

    let clearForm =()=>{
      form.reset()
    }
    this.commonService.postData(data, type)
      .subscribe(()=>clearForm())

  }

  getSpendingReports(){
    this.commonService.getReportsByType("spending")
    .subscribe((data)=>{
      this.spendingReports = data;
      this.getSum(data, "spendingSum")
      });
  }
  getEncomingReports(){
    this.commonService.getReportsByType("encoming")
    .subscribe((data)=>{
      this.encomingReports = data;
      this.getSum(data, "encomingSum")
      });
  }

  getSum(data, ref):void{
    let sum = 0;
    for(let report of data){
      console.log(report);
      sum +=report.amount;
    }
    console.log(sum)
    eval(`this.${ref} = sum`);
  }
