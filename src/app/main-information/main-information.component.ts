import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CommonService } from '../common.service'

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})


export class MainInformationComponent implements OnInit {

  data: any;
  freeMony:number;
  user:object[];

  total: number = 500;
  cells: string[];
  spendings: object[];

  spendingCanvas : object[]

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
    .then(console.log)
  }

  getCanvasData(){
    let data = []
    this.spendings.forEach((spending,i)=>{
      
    })
  }

}
