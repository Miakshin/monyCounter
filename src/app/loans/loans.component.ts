import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loans: any;
  loansSum: number;
  createLoanFormGroup : FormGroup;
  activeCurancy: any[];

  constructor (private commonService: CommonService) {
    this.createLoanFormGroup = new FormGroup({
      "name": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
      "tax": new FormControl("",[
        Validators.required,
        Validators.pattern("^[0-9]{1,3}")
      ]),
      "color": new FormControl("", Validators.required),
      "acamulated": new FormControl("",[
        Validators.required,
        Validators.pattern("^[0-9]{1,12}")
      ]),
    });
  }
  ngOnInit() {
      this.getEncomingReports()
      this.commonService.getUserByLogin("admin")
      .subscribe((user)=>{
        this.activeCurancy=user.setings.activeCurancy
        .filter(curancy => curancy.checked === true)})
  }

  createLoan() :void{
    let form = eval("document.forms.loan")
    let data = {
      date: Date.now(),
      amount: this.createLoanFormGroup.value.amount,
      description : this.createLoanFormGroup.value.description,
      currency : this.createLoanFormGroup.value.currency,
      from: this.createLoanFormGroup.value.from
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


}
