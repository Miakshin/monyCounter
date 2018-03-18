import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

import { User } from './User'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  currentUser: User;
  sumItems={
    encomesSum : 0,
    spendingSum :0,
    cellsAcamulatedsSum:0,
    getFreeMony: function(){
      return(this.encomesSum - this.spendingSum - this.cellsAcamulatedsSum);
    },
    freeMony: 0
  }

  constructor(private commonService: CommonService) { }

  ngOnInit(){
    this.getUserData();
  }

  getUserData():void{
    this.commonService.getUserByLogin("admin")
    .subscribe((user)=>{this.currentUser = user;
      console.log(user)
      let promises=[]
      for(let cellId of this.currentUser.setings.activCells){
        let promise = new Promise((res,rej)=>{
           let cellAcamulated;
           this.commonService.getCellById(cellId)
           .then((cell)=>{
             console.log(cell.acamulated)
             res(cell.acamulated)
           })
        })
        promises.push(promise)
      }
      Promise.all([...promises])
      .then((cellsAcomulateds)=>{
        let acamulatedSum = 0;
        cellsAcomulateds.forEach((item)=>{
          acamulatedSum += item;
        })
        this.sumItems.cellsAcamulatedsSum = acamulatedSum;
      })
      .then(()=>{
        this.commonService.getReportsByType("spending")
        .subscribe((spendingData)=>{
          let spendingSum = 0;
          for(let report of spendingData){
            spendingSum +=report.amount;
          }
          this.sumItems.spendingSum = spendingSum;
          this.commonService.getReportsByType("encoming")
          .subscribe((encomingData)=>{
            let encomingSum = 0;
            for(let report of encomingData){
              encomingSum +=report.amount;
            }
            this.sumItems.encomesSum = encomingSum;
            this.sumItems.freeMony = this.sumItems.getFreeMony();
            });
          });
      })
    })
  }
}
