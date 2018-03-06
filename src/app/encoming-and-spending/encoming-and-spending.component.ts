import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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
    this.getCurrentTax();
  }

  sendReport(type) :void{
    let form = eval(`document.forms.${type}`);
    let data;
    let writedTax = [];
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
      };
      console.log(this.activeTax.length > 0)
        if(this.activeTax.length > 0){data.isTax = true; data.taxedTo=this.activeTax; data.taxed = 0;
        this.activeTax.forEach((item)=>{
          this.commonService.getCellById(item).subscribe((cell)=>{
            data.taxed = data.taxed + cell.tax * data.amount /100;
            let report ={
              'id': cell.id,
              'tax': (cell.tax * data.amount /100)
            }
            writedTax.push(report)
          })
        })}
        else{ data.isTax = false}


    }

    let clearForm =()=>{
      form.reset()
    }

    console.log(data);
    this.commonService.postData(data, type)
      .subscribe((res)=>{
        clearForm();
        if(writedTax.length > 0){
        let _id = res._id;
        writedTax.forEach((report)=>{
          this.commonService.addRepotrToCell(report,_id)
        })
        }
      })

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
      // console.log(report);
      sum +=report.amount;
    }
    // console.log(sum)
    eval(`this.${ref} = sum`);
  }

  getCurrentTax(){
    this.commonService.getUserByLogin("admin")
    .subscribe((user)=>{this.activeTax = user.setings.activCells;})
  }

}
