import { Component, Input} from '@angular/core';
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
export class SpendingInputsComponent{

  @Input() activeCurancy: any[];
  @Input() activeTax: string[];
  @Input() activCells: string[];
  @Input() cells: Cell[];
  @Input() spendingTypes: any[];
  spendingLines: SpendingLine[];

  constructor(private commonService: CommonService){
    this.spendingLines = new Array(1);
    this.spendingLines.fill(new Line(Date.now(),"",0,"uah",""))
  }

  addLine():void {
    this.spendingLines.push(new Line(Date.now(),"", 0,"uah",""))
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
        })
  }


}
