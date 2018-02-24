import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service'

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})


export class MainInformationComponent implements OnInit {

  data: any;
  freeMony:number;

  total: number = 500;
  cells = {
    investigetion : 45,
    house: 60
  }

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getFreeMony();
  }

  getData(){
    this.commonService.getData().subscribe(data => console.log("it is data:" + data),
      error => console.log("it is error:" + error));
  }

  getFreeMony():void{
    let spendingsSum;
    let encomingSum;

    this.commonService.getReportSum('spending')
    .subscribe((data)=>{
      spendingsSum = Number(data);
      this.commonService.getReportSum('encoming')
      .subscribe((data)=>{
        encomingSum = Number(data);
        this.freeMony = encomingSum - spendingsSum;
      })
    })
  }



}
