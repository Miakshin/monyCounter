import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-encoming-and-spending',
  templateUrl: './encoming-and-spending.component.html',
  styleUrls: ['./encoming-and-spending.component.css']
})
export class EncomingAndSpendingComponent implements OnInit {

  spendingReports = [];
  encomingReports = [];
  activeTax = [];
  activCells: [string];
  activeCurancy: [object];

  encomingFormGroup : FormGroup;

  constructor(private commonService: CommonService) {
  this.encomingFormGroup = new FormGroup({
    "description": new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")
    ]),
    "amount": new FormControl(),
    "currency": new FormControl(),
});
 }

  getDate(){
    let now = new Date;
    return now
  }

  ngOnInit():void{
    this.getSpendingReports();
    this.getEncomingReports();
    this.getDataSettings();
  }

  sendSpendingReport(){
    let form = eval(`document.forms.spending`);
    let data;
    data = {
      date: Date.now(),
      amount: form.elements.amount.value,
      description : form.elements.description.value,
      currency : form.elements.currency.value
    };
    this.commonService.postData(data, "spending")
    .subscribe(()=>{form.reset()
    this.getSpendingReports()
  })
  }

  sendEncomingReport() :void{
    let form = eval(`document.forms.encoming`);
    let data;
    let writedTax = [];
    let taxPromises = [];
      data = {
        date: Date.now(),
        amount: this.encomingFormGroup.value.amount,
        description : this.encomingFormGroup.value.description,
        currency : this.encomingFormGroup.value.currency,
      };
        if(this.activeTax.length > 0){data.isTax = true; data.taxTo=this.activeTax; data.taxed = 0;
        this.activeTax.forEach((item)=>{
          let promise = new Promise((res,rej)=>{
            this.commonService.getCellById(item)
              .then((cell)=>{
              console.log(cell);
              data.taxed = data.taxed + cell.tax * data.amount /100;
               let report ={
                 'id': cell._id,
                 'tax': (cell.tax * data.amount /100)
               }
               res(report);
            })
          })
          taxPromises.push(promise);
        })

        Promise.all([...taxPromises])
        .then((cellArr)=>{
          return cellArr
        })
        .then((reports)=>{
          console.log(reports);
          this.commonService.postData(data, "encoming")
          .subscribe((res)=>{
            console.log(res);
            form.reset()
            this.getEncomingReports()
            reports.forEach((report)=>{
              let cellData = {
                from: res._id,
                amount: report.tax,
                date: new Date()
              }
              this.commonService.addRepotrToCell(report.id, cellData)
              .subscribe(console.log)
            })
          })
        })
      }else{ data.isTax = false;
          this.commonService.postData(data, "encoming")
          .subscribe(()=>{
          form.reset()
          this.getEncomingReports()}
        )}
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


  getDataSettings(){
    this.commonService.getUserByLogin("admin")
    .subscribe((user)=>{
      this.activeTax = user.setings.activCells;
      this.activCells = user.setings.activCells;
      this.activeCurancy = user.setings.activeCurancy.filter((item)=>{
        return item.checked === true})
      })
  }

}
