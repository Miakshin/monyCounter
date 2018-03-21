import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit, AfterContentChecked {

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
    this.commonService.currentLoansData
      .subscribe(loans => this.loans = loans);
    this.commonService.currentloansSumData
      .subscribe(sum => this.loansSum = sum)
  }

  ngAfterContentChecked(){
    this.commonService.currentUserData
      .subscribe((user)=>{
        if(user){
          this.activeCurancy=user.setings.activeCurancy
          .filter(curancy => curancy.checked === true)
        }
    });
  }

  createLoan() :void{
    let data = {
      date: Date.now(),
      amount: this.createLoanFormGroup.value.amount,
      description : this.createLoanFormGroup.value.description,
      currency : this.createLoanFormGroup.value.currency,
      from: this.createLoanFormGroup.value.from
    };
    this.commonService.postData(data, "loan")
      .subscribe(()=>{
        this.commonService.getReportsByType("loan")
          .subscribe(loans=>this.commonService.refreshLoans(loans))
        this.createLoanFormGroup.reset()})

  }


}
