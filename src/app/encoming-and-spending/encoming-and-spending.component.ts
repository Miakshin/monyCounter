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
  activCells: any;

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
        amount: form.elements.amount.value,
        description : form.elements.description.value,
        currency : form.elements.currency.value,
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

  getDataSettings(){
    this.commonService.getUserByLogin("admin")
    .subscribe((user)=>{
      this.activeTax = user.setings.activCells;
      this.activCells = user.setings.activCells})
  }

}
