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
    .subscribe((users)=>{this.currentUser = users[0];
    console.log(users[0])})
  }
}
