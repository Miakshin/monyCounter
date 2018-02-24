import { Component, OnInit } from '@angular/core';

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
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    return `${dd}.${mm}.${yy}`
  }

  ngOnInit():void{
    this.getSpendingReports();
    this.getEncomingReports();
    this.getSpendingSum();
    this.getEncomingSum();
  }

  sendReport(type) :void{
    let form = eval(`document.forms.${type}`);
    let data = {
      date: Date.now(),
      type: type,
      amount: form.elements.amount.value,
      description : form.elements.description.value,
      currency : form.elements.currency.value
    };
    let clearForm =()=>{
      form.reset()
    }
    this.commonService.postData(data)
      .subscribe(()=>clearForm())

  }

  getSpendingReports(){
    this.commonService.getReportsByType("spending")
    .subscribe((data)=>{
      this.spendingReports = data;
      });
  }
  getEncomingReports(){
    this.commonService.getReportsByType("encoming")
    .subscribe((data)=>{
      this.encomingReports = data;
      });
  }

  getSpendingSum(){
    this.commonService.getReportSum("spending")
    .subscribe((data)=>{
      this.spendingSum = Number(data);
      });
  }

  getEncomingSum(){
    this.commonService.getReportSum("encoming")
    .subscribe((data)=>{
      this.encomingSum = Number(data);
      });
  }
}
