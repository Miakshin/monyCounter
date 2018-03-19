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
  freeMony:number;
  user: User;

  total: number = 500;
  cells: string[];
  spendings: Spending[];

  spendingCanvasData : CanvasData[];
  encomingCanvasData : CanvasData[] = [{
     category: "free mony",
      amount: 471.9 ,
      color: "#16f539"
  },
  {
     category: "investigation",
      amount: 270.1 ,
      color: "#9c27b0"
  }];

  constructor(private commonService : CommonService) {
}

  ngOnInit() {
    Promise.all([this.commonService.getUserByLogin("admin")
      .toPromise()
      .then(user=>this.user = user),
      this.commonService.getReportsByType("spending")
      .toPromise()
      .then(data=> this.spendings = data),
      this.commonService.getReportsByType("cell")
      .toPromise()
      .then(data=> this.cells = data)])
    .then(()=>{
      this.getSpendingCanvasData();
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
    // let data : CanvasData[] = [{category: "free mony",
    //  amount: 471.9 ,
    //  color: "#16f539"}]

  }

}
