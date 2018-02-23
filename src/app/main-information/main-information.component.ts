import { Component, OnInit } from '@angular/core';

import { CommonService } from '../common.service'

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})


export class MainInformationComponent implements OnInit {

  data: any;

  total: number = 500;
  freeMony: number = 112;
  cells = {
    investigetion : 45,
    house: 60
  }

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.commonService.getData().subscribe(data => console.log("it is data:" + data),
      error => console.log("it is error:" + error));
  }



}
