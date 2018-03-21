import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

import { User } from './User';
import { Spending } from './Spending';
import { Encoming } from './Encoming';
import { Cell } from './cells/cell/cell';
import { Loan } from './Loan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  currentUser : User;
  spendings : Spending[];
  encomings : Encoming[];
  cells : Cell[];
  loans : Loan[];
  freeMony: number;

  constructor(private commonService: CommonService) {}

  ngOnInit(){
    this.initializateUser();
    this.initializateSpending();
    this.initializateEncoming();
    this.initializateCells();
    this.commonService.currentFreeMonyData
      .subscribe(fm => {
        this.freeMony = +fm})
  }

  initializateUser(){
    document.cookie = "login=admin"
    this.commonService.getUserByLogin(document.cookie.slice(6))
      .subscribe((user:User) =>{
        this.commonService.refreshUser(user);
        this.commonService.currentUserData
          .subscribe( user => {
            this.currentUser = user;
          })
      })
  }

  initializateSpending(){
    this.commonService.getReportsByType("spending")
      .subscribe((spendings:Spending[])=> {
        this.commonService.refreshSpendings(spendings);
        this.commonService.currentSpendingData
          .subscribe(spends => this.spendings = spends);
      })
  }

  initializateEncoming(){
    this.commonService.getReportsByType("encoming")
      .subscribe(encomings => {
        this.commonService.refreshEncomings(encomings);
        this.commonService.currentEncomingData
          .subscribe(encoms => this.encomings = encoms);
      })
  }

  initializateCells(){
    this.commonService.getReportsByType("cell")
      .subscribe(cells => {
        this.commonService.refreshCells(cells);
        this.commonService.currentCellsData
          .subscribe(cll => this.cells = cll);
      })
  }

  initializateLoans(){
    this.commonService.getReportsByType("loan")
      .subscribe(loans =>{
        this.commonService.refreshLoans(loans);
        this.commonService.currentEncomingData
        .subscribe(ln => this.loans = ln);
      });
  }

}
