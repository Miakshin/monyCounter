import { Component, OnInit } from '@angular/core';
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


export class MainInformationComponent implements OnInit {

  data: any;
  freeMony: number;
  user: User;

  total: number;
  cells: string[];
  spendings: Spending[];
  encomings: Encoming[];

  spendingSum: number;
  encomingSum: number;
  cellAcamilation: number;

  spendingCanvasData : CanvasData[];
  encomingCanvasData : CanvasData[];

  constructor(private commonService : CommonService) {
}

  ngOnInit() {
    Promise.all([this.commonService.getUserByLogin("admin")
      .toPromise()
      .then(user=>this.user = user),
      this.commonService.getReportsByType("spending")
      .toPromise()
      .then(data=> {
        this.spendings = data;}),
      this.commonService.getReportsByType("encoming")
      .toPromise()
      .then(data=> this.encomings = data),
      this.commonService.getReportsByType("cell")
      .toPromise()
      .then(data=> this.cells = data)])
    .then(()=>{
      this.getAcamulation();
      this.getEncomingSum();
      this.getSpendingsSum()
      this.getFreeMony();
      this.getSpendingCanvasData();
      this.getEncomingCanvasData();
      this.getTotal();
    })
  }

  getSpendingCanvasData(){
    let data: any[] = []
      this.spendings.forEach((spending: any)=>{
        let dataSlice :any = data.find((slice: any)=>{
          return slice.category === spending.type? true : false} );
          console.log(dataSlice)
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

  getEncomingCanvasData(){
    let data : CanvasData[] = [
    {category: "free mony",
     amount: this.freeMony ,
     color: "#16f539"}]
    for(let cell of this.cells){
      data.push({
        category: cell["name"],
        amount: cell["acamulated"] ,
        color: cell["diagramColor"]
      })
    }
    console.log(data);
    this.encomingCanvasData = data;

  }

  getAcamulation(){
    let sum: number = 0
    this.cells.forEach((item: any) => sum += item.acamulated);
    this.cellAcamilation = sum;
  }

  getSpendingsSum(){
    let sum = 0;
    for(let spending of this.spendings){
      (sum+= spending.amount)
    }
    this.spendingSum = sum;
  }

  getEncomingSum(){
    let sum = 0;
    for(let encoming of this.encomings){
      sum += encoming.amount;
    }
    this.encomingSum = sum;
  }

  getFreeMony(){
    this.freeMony = this.encomingSum - this.spendingSum - this.cellAcamilation;
  }

  getTotal(){
    this.total = this.freeMony + this.cellAcamilation;
    console.log(this.total)
  }
}
