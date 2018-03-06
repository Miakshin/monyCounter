import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  currentUser={};

  constructor(private commonService: CommonService) { }

  ngOnInit(){
    this.getUserData()
  }

  getUserData(){
    this.commonService.getUserByLogin("admin")
    .subscribe((user)=>{this.currentUser = user;
    console.log(user)})
  }
}
