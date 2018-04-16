import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { CommonService } from '../common.service';
import { Cell } from '../cells/cell/cell';
import { User } from '../User';

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
  cells: Cell[];
  user: User[];

  constructor (private commonService: CommonService) {
    this.createLoanFormGroup = new FormGroup({
      "description": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
      "amount": new FormControl("",[
        Validators.required,
        Validators.pattern("^[0-9]{1,12}")
      ]),
      "curancy": new FormControl("", [
        Validators.required, Validators.pattern("[^{}*<>]{3,4}")]),
      "fromCell": new FormControl("",[
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
    });
  }
  ngOnInit():void{
    this.commonService.currentLoansData
      .subscribe(loans => this.loans = loans);
    this.commonService.currentloansSumData
      .subscribe(sum => this.loansSum = sum);
    this.commonService.currentUserData
      .subscribe(user => this.user = user );
    this.commonService.currentCellsData
      .subscribe(cells => this.cells = cells);
  }

  ngAfterContentChecked():void{
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
