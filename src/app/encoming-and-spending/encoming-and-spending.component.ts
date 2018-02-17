import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encoming-and-spending',
  templateUrl: './encoming-and-spending.component.html',
  styleUrls: ['./encoming-and-spending.component.css']
})
export class EncomingAndSpendingComponent implements OnInit {


  constructor() { }

  getDate(){
    let now = new Date;
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    return `${dd}.${mm}.${yy}`
  }

  ngOnInit() {
  }

}
