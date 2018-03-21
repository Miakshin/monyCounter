import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from './User';
import { Spending } from './Spending';
import { Encoming } from './Encoming';
import { Cell } from './cells/cell/cell';
import { Loan } from './Loan';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }

  user: User;
  encomings: Encoming[];
  spendings: Spending[];
  cells: Cell[];
  loans: Loan[];
  spendingSum: number = 0;
  encomingSum: number = 0;
  cellsSum: number = 0;
  loansSum:number = 0;
  freeMony: number = 0;


  private userSource = new BehaviorSubject<any>(this.user);
  currentUserData = this.userSource.asObservable();

  private encomingsSource = new BehaviorSubject<any>(this.encomings);
  currentEncomingData = this.encomingsSource.asObservable();

  private spendingsSource = new BehaviorSubject<any>(this.spendings);
  currentSpendingData = this.spendingsSource.asObservable();

  private cellsSource = new BehaviorSubject<any>(this.spendings);
  currentCellsData = this.cellsSource.asObservable();

  private loansSource = new BehaviorSubject<any>(this.loans);
  currentLoansData = this.loansSource.asObservable();

  private freeMonySource = new BehaviorSubject<any>(this.freeMony);
  currentFreeMonyData = this.freeMonySource.asObservable();

  refreshUser(newData){
    this.userSource.next(newData)
  }

  refreshEncomings(newData){
    this.encomingsSource.next(newData);
    this.encomings = newData;
    if(this.encomings.length > 0){
      this.getEncomingsSum();
      this.getFreeMony();
    }
  }

  refreshSpendings(newData){
    this.spendingsSource.next(newData);
    this.spendings = newData;
    if(this.spendings.length > 0){
      this.getSpendingsSum();
      this.getFreeMony();
    }
  }

  refreshCells(newData){
    this.spendingsSource.next(newData);
    this.cells = newData
    if(this.cells.length > 0){
      this.getCellsSum();
      this.getFreeMony();
    }
  }

  refreshLoans(newData){
    this.loansSource.next(newData);
    this.loans = newData;
    if(this.loans.length > 0){
      this.getLoansSum();
      this.getFreeMony();
    }
  }

  refreshFreeMony(newData){
    this.freeMonySource.next(newData)
  }

  getSpendingsSum(){
    let sum = 0;
    for(let spending of this.spendings){
      (sum+= spending.amount)
    }
    this.spendingSum = sum;
  }

  getEncomingsSum(){
    let sum = 0;
    for(let encoming of this.encomings){
      sum += encoming.amount;
    }
    this.encomingSum = sum;
  }

  getCellsSum(){
    let sum: number = 0;
    this.cells.forEach((item: any) => sum += item.acamulated);
    this.cellsSum = sum;
  }

  getLoansSum(){
    let sum = 0;
    for(let encoming of this.loans){
      sum += this.loans["amount"];
    }
    this.loansSum = sum;
  }

  getFreeMony(){
    console.log(`es : ${this.encomingSum},  ss : ${this.spendingSum},
      cs :  ${this.cellsSum}, ls:  ${this.loansSum}`)
    let freeMony = this.encomingSum - this.spendingSum - this.cellsSum - this.loansSum;
    this.freeMonySource.next(freeMony)
  }



  getCellById(id){
    return this.http.get<any>(`http://localhost:3046/cells/${id}`)
    .toPromise()
  }

  getReportsByType(type): Observable<any>{
      return this.http.get<any>(`http://localhost:3046/reports/${type}`);
    }

  getReportsByTypeFlag(type,flag,data): Observable<any>{
        return this.http.post<any>(`http://localhost:3046/reports/${type}/${flag}`
          , data);
      }

  postData(data, dataType) {
    return this.http.post<any>(`http://localhost:3046/report/${dataType}`, data)
  }

  getUserByLogin(login): Observable<any>{
      return this.http.get<any>(`http://localhost:3046/user/${login}`);
  }

  addRepotrToCell(id, repotr){
    return this.http.post<any>(`http://localhost:3046/cells/${id}`, repotr)
  }

  changeSettings(user, type, params){
    return this.http.post<any>(`http://localhost:3046/user/${user}/settings/${type}`, params)
  }

}
