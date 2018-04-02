import { Component, Input} from '@angular/core';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { EncomingLine } from './Encomingline';
import { CommonService } from '../../common.service';
import { Cell } from '../../cells/cell/cell'

export class Line{
    constructor(public date: number,
                public description: string,
                public amount: number,
                public currency: string)
    { }
}

@Component({
  selector: 'encoming-inputs',
  templateUrl: './encoming-inputs.component.html'
})
export class EncomingInputsComponent{

  @Input() activeCurancy: any[];
  @Input() activeTax: string[];
  @Input() activCells: string[];
  @Input() cells: Cell[];
  encomingLines: EncomingLine[];

  constructor(private commonService: CommonService){
    this.encomingLines.fill(new Line(Date.now(),"", 0,"uah"))
  }

  addLine():void {
    this.encomingLines.push(new Line(Date.now(),"", 0,"uah"))
  }

  removeLine(id):void {
    let index:number = this.encomingLines.findIndex(line => line.date === id);
    if(index!== -1){
      this.encomingLines.splice(index,1)
    }
  }

  sendEncomingreports(){
    this.encomingLines.forEach((line)=>{
      let data:any = Object.assign({}, line);

      //check do we have to send a tax reports

      if(this.activeTax.length > 0){
        data.isTax = true; data.taxTo=this.activeTax; data.taxed = 0;
          this.activeTax.forEach((item)=>{
            let cell = this.cells.find((cell)=>cell._id === item)
            data.taxed = data.taxed + cell.tax * data.amount /100;
        })
          this.commonService.postData(data, "encoming")
          .subscribe((res)=>{
            this.activeTax.forEach((item)=>{
              let cell = this.cells.find((cell)=>cell._id === item)
              let amount = cell.tax * res.amount /100;
              let data = {
                from: res._id,
                amount: amount,
                description: res.description,
                date: new Date()
              }
              this.commonService.addRepotrToCell(item, data)
                .subscribe(()=>
                  this.commonService.getReportsByType("cell")
                    .subscribe(cells =>this.commonService.refreshCells(cells)))
            })
            this.commonService.getReportsByType("encoming")
              .subscribe(encomings=> this.commonService.refreshEncomings(encomings))
            })

      // if we dont have tax active tax - just send all reports

      }else{ data.isTax = false;
        this.commonService.postData(data, "encoming")
          .subscribe(()=>{
              this.commonService.getReportsByType("encoming")
                .subscribe(encomings=>this.commonService.refreshEncomings(encomings))
            }
          )}
        })

  }

}
