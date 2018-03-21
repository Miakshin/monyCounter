import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CommonService } from '../common.service';
import { Spending } from '../Spending';
import { Encoming } from '../Encoming';
import { User } from '../User';
import { CanvasData } from './canvas/CanvasData';

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})


export class MainInformationComponent implements OnInit, AfterContentChecked {

  freeMony: number;
  user: User;

  total: number;
  cells: string[];
  spendings: Spending[];
  encomings: Encoming[];

  spendingSum: number;
  encomingSum: number;
  cellAcamulation: number;

  spendingCanvasData : CanvasData[];
  encomingCanvasData : CanvasData[];

  constructor(private commonService : CommonService) {
}

  ngOnInit() {
    this.commonService.currentUserData
      .subscribe(user => this.user = user );
    this.commonService.currentCellsData
      .subscribe(cells => this.cells = cells)
    this.commonService.currentEncomingData
      .subscribe(encomings => {
        this.encomings = encomings;
      });
    this.commonService.currentSpendingData
      .subscribe(spendings => {
        this.spendings = spendings;
      });
    this.commonService.currentFreeMonyData
      .subscribe(fm => this.freeMony = fm);
    this.commonService.currentCellsSumData
      .subscribe(cellsSum => this.cellAcamulation = cellsSum)
  }

  ngAfterContentChecked(){
    this.getTotal();
    this.getSpendingCanvasData();
    this.getEncomingCanvasData();
  }

  getSpendingCanvasData(){
    if(this.spendings && this.user){
      let data: any[] = [];
        this.spendings.forEach((spending: any)=>{
          let dataSlice :any = data.find((slice: any)=>{
            return slice.category === spending.type? true : false} );
          dataSlice === undefined ?
            data.push({
            category: spending.type,
            amount: spending.amount
            })
            :
            dataSlice.amount += spending.amount;
        })
        data.forEach((item:any)=>{
          item.color = this.user.setings.spendingTypes.find(
            (type)=>{return type.name === item.category ? true : false}).color
        })
        this.spendingCanvasData = data;
    }
  }

  getEncomingCanvasData(){
    if(this.cells && this.freeMony){
      let data : CanvasData[] = [{
        category: "free mony",
        amount: this.freeMony ,
        color: "#16f539"}]
      for(let cell of this.cells){
        data.push({
          category: cell["name"],
          amount: cell["acamulated"] ,
          color: cell["diagramColor"]
        })
      }
      this.encomingCanvasData = data;
    }
  }

  getTotal(){
    if(this.freeMony && this.cellAcamulation){
      this.total = this.freeMony + this.cellAcamulation;}
  }
}
