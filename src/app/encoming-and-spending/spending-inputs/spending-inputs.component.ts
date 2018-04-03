import { Component, Input, AfterContentChecked} from '@angular/core';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { SpendingLine } from './SpendingLine';
import { CommonService } from '../../common.service';
import { Cell } from '../../cells/cell/cell'

export class Line{
    constructor(public date: number,
                public description: string,
                public amount: number,
                public currency: string,
                public spendingTypes: string)
    { }
}

@Component({
  selector: 'spending-inputs',
  templateUrl: './spending-inputs.component.html',
  styleUrls: ['./spending-inputs.component.css']
})
export class SpendingInputsComponent implements AfterContentChecked{

  @Input() activeCurancy: any[];
  @Input() activeTax: string[];
  @Input() activCells: string[];
  @Input() cells: Cell[];
  @Input() spendingTypes: any[];
  spendingLines: SpendingLine[];
  formInvalid: boolean;

  constructor(private commonService: CommonService){
    this.formInvalid = true;
    this.spendingLines = new Array(1);
    this.spendingLines.fill(new Line(Date.now(),"",0,"uah","another"))
  }

  addLine():void {
    this.spendingLines.push(new Line(Date.now(),"", 0,"uah","another"))
  }

  removeLine(id):void {
    let index:number = this.spendingLines.findIndex(line => line.date === id);
    if(index!== -1){
      this.spendingLines.splice(index,1)
    }
  }

  sendSpendingReports():void{
    this.spendingLines.forEach(line=>{
      let data:SpendingLine = Object.assign({}, line);
        this.commonService.postData(data, "spending")
        .subscribe(()=>{
          this.spendingLines.length > 1?
            this.removeLine(line.date) :
            this.spendingLines.fill(new Line(Date.now(),"", 0,"uah",""));
          this.commonService.getReportsByType("spending")
            .subscribe(spendings=>this.commonService.refreshSpendings(spendings))
      })
      this.spendingLines.length > 1 ?
        this.removeLine(line.date):
        this.spendingLines[0] = new Line(Date.now(),"",0,"uah","another")
    })
  }

  checkForm():boolean{
    let validationArray:boolean[] = this.spendingLines.map(line =>{
      return (line.description.length >= 3 && line.amount > 0) ?
        true :
        false
    })
    return validationArray.findIndex(ans => ans === false) === -1 ?
      false:
      true
  }

  ngAfterContentChecked():void{
    this.formInvalid = this.checkForm()
  }


}
