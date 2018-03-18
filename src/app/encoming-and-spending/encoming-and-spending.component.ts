import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { CommonService } from '../common.service';
import { SpendingLine } from './SpendingLine';
import { EncomingLine } from './Encomingline';

@Component({
  selector: 'app-encoming-and-spending',
  templateUrl: './encoming-and-spending.component.html',
  styleUrls: ['./encoming-and-spending.component.css']
})
export class EncomingAndSpendingComponent implements OnInit {

  spendingReports = [];
  encomingReports = [];
  activeTax: [string];
  activCells: [string];
  activeCurancy: [object];
  spendingTypes: [object]
  encomingLines: EncomingLine[] = [{
    id : 0,
    descriptionName: 'description-0',
    amountName: 'amount-0',
    currencyName: 'currency-0',
  }];
  spendingLines: SpendingLine[] = [{
    id : 0,
    descriptionName: 'description-0',
    amountName: 'amount-0',
    currencyName: 'currency-0',
    spendingTypesName: 'spendingTypes-0'
  }];
  serchFlag: string;
  lastTenRepeat: number = 1;


  encomingFormGroup : FormGroup;
  spendingFormGroup : FormGroup;
  serchFormGroup: FormGroup;

  constructor(private commonService: CommonService) {
    this.serchFlag = "last ten";

    this.encomingFormGroup = new FormGroup({
      "description-0": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
      "amount-0": new FormControl("",[
        Validators.required,
        Validators.pattern("^[0-9]{1,12}")
      ]),
      "currency-0": new FormControl("", Validators.required),
      });

      this.spendingFormGroup = new FormGroup({
        "description-0": new FormControl("", [
          Validators.required,
          Validators.pattern("[^{}*<>_]{2,55}")
        ]),
        "amount-0": new FormControl("",[
          Validators.required,
          Validators.pattern("^[0-9]{1,12}")
        ]),
        "currency-0": new FormControl("", Validators.required),
        "spendingTypes-0": new FormControl("", Validators.required)
        });

      this.serchFormGroup = new FormGroup({
        "since" : new FormControl("", Validators.required),
        "for" : new FormControl("", Validators.required)
      })
 }

 ngOnInit():void{
   this.getData();
   this.getDataSettings();
 }

  getData(){
    switch(this.serchFlag){
      case "last ten":
      this.commonService.getReportsByTypeFlag("encoming", this.serchFlag, {repeat: this.lastTenRepeat})
      .subscribe((data)=>{
        this.encomingReports = data;
        })
      this.commonService.getReportsByTypeFlag("spending", this.serchFlag, {repeat: this.lastTenRepeat})
      .subscribe((data)=>{
        this.spendingReports = data;
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
      this.getSpendingReports();
      this.getEncomingReports();
      break;
    }
  }

  addLine(type){
    let id = Date.now();
    if(this[`${type}Lines`].length>=10){
      this.printErr("The maximum number of rows is 10")
    }
    else{
      this[`${type}Lines`].push({
        id : id,
        descriptionName: `description-${id}`,
        amountName: `amount-${id}`,
        currencyName: `currencyName-${id}`})

      this[`${type}FormGroup`].controls[`description-${id}`] = new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>_]{2,55}")]);
      this[`${type}FormGroup`].controls[`amount-${id}`] = new FormControl("",[
        Validators.required,
        Validators.pattern("^[0-9]{1,12}")]);
      this[`${type}FormGroup`].controls[`currencyName-${id}`] = new FormControl("", Validators.required);

      if(type === "spending"){
        this[`spendingFormGroup`].controls[`spendingTypes-${id}`] = new FormControl("", Validators.required);}
    }
  }

  removeLine(type,id){
    let position = this[`${type}Lines`].findIndex((line)=>{
      return line.id === id ? true : false})
    if(position >= 0){
      if(this[`${type}Lines`].length > 1){
        this[`${type}Lines`].splice(position,1);

        delete this[`${type}FormGroup`].controls[`description-${id}`];
        delete this[`${type}FormGroup`].controls[`amount-${id}`];
        delete this[`${type}FormGroup`].controls[`currencyName-${id}`];
      }else{
        this.printErr("You can`t delite all rows")
      }
    }
  }

  printErr(errText){
    let header = document.getElementById('header')
    let errDiv = document.createElement('div');
    errDiv.className = "errDiv hiden";
    errDiv.innerHTML = errText;
    header.insertBefore(errDiv, header.firstChild);
    setTimeout(()=>{errDiv.className = "errDiv"}, 100)
    setTimeout(()=>{errDiv.className = "errDiv hiden"}, 3000)
    setTimeout(()=>{header.removeChild(errDiv)}, 4000);
  }

  lineValidation(type,inputName){
  return this[`${type}FormGroup`].controls[inputName].invalid
  && this[`${type}FormGroup`].controls[inputName].touched ? true : false
  }

  getDate(){
    let now = new Date;
    return now
  }

  sendSpendingReport():void{
    let form = eval(`document.forms.spending`);
    this.spendingLines.forEach((line)=>{
      let data;
      data = {
        date: Date.now(),
        amount: this.spendingFormGroup.value[line.amountName],
        description : this.spendingFormGroup.value[line.descriptionName],
        currency : this.spendingFormGroup.value[line.currencyName]
      };
      this.commonService.postData(data, "spending")
      .subscribe(()=>{
        this.spendingLines.length > 1?
          this.removeLine("spending", line.id) :
          this.spendingFormGroup.value[line.amountName] ="",
          this.spendingFormGroup.value[line.descriptionName]="",
          this.spendingFormGroup.value[line.currencyName]="";
        this.getSpendingReports()
      })
    })

  }

  sendEncomingReport() :void{

    this.encomingLines.forEach((line)=>{
      let writedTax = [];
      let taxPromises = [];
      let data :any = {
          date: Date.now(),
          amount: this.encomingFormGroup.value[line.amountName],
          description : this.encomingFormGroup.value[line.descriptionName],
          currency : this.encomingFormGroup.value[line.currencyName]
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
          // .then((cellArr)=>{
          //   return cellArr
          // })
          .then((reports)=>{
            console.log(data);
            this.commonService.postData(data, "encoming")
            .subscribe((res)=>{
              if(this.encomingLines.length === 1){this.encomingFormGroup.reset()
            }else{
              this.removeLine("encoming", line.id)
            // delete this.encomingFormGroup.controls[`description-${line.id}`];
            // delete this.encomingFormGroup.controls[`amount-${line.id}`];
            // delete this.encomingFormGroup.controls[`currencyName-${line.id}`];

              console.log(this.encomingFormGroup);
            }
              this.getEncomingReports()
              reports.forEach((report)=>{
                let cellData = {
                  description: res.description,
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
              this.encomingLines.length > 1?
                this.removeLine("encoming", line.id) :
                this.encomingFormGroup.value[line.amountName] ="",
                this.encomingFormGroup.value[line.descriptionName]="",
                this.encomingFormGroup.value[line.currencyName]="";
            this.getEncomingReports()}
          )}
    })

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
      console.log(user);
      this.activeTax = user.setings.activCells;
      this.activCells = user.setings.activCells;
      this.spendingTypes = user.setings.spendingTypes;
      console.log(user.setings.spendingTypes);
      this.activeCurancy = user.setings.activeCurancy.filter((item)=>{
        return item.checked === true})
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
