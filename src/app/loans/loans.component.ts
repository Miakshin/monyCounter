import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service'

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loans: any;
  loansSum: number;

  constructor(private commonService: CommonService) { }

  sendLoan() :void{
    let form = eval("document.forms.loan")
    let data = {
      date: Date.now(),
      amount: form.elements.amount.value,
      description : form.elements.description.value,
      currency : form.elements.currency.value,
      from: form.elements.from.value
    };
    let clearForm =()=>{
      form.reset()
    }
    this.commonService.postData(data, "loan")
      .subscribe(()=>clearForm())

  }

  getEncomingReports(){
    this.commonService.getReportsByType("loan")
    .subscribe((data)=>{
      this.loans = data;
      this.getLoansSum();
      });
  }

  getLoansSum():any {
    let sum:number = 0;
    this.loans.forEach(function(item){
      return sum += Number(item.amount);
    })
    console.log(sum);
    this.loansSum =  sum
  }

  ngOnInit() {
    this.getEncomingReports()
  }

}
