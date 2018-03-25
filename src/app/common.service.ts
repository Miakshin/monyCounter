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
  currentUser: string;


  private userSource = new BehaviorSubject<any>(this.user);
  currentUserData = this.userSource.asObservable();

  private encomingsSource = new BehaviorSubject<any>(this.encomings);
  currentEncomingData = this.encomingsSource.asObservable();

  private spendingsSource = new BehaviorSubject<any>(this.spendings);
  currentSpendingData = this.spendingsSource.asObservable();

  private cellsSource = new BehaviorSubject<any>(this.cells);
  currentCellsData = this.cellsSource.asObservable();

  private loansSource = new BehaviorSubject<any>(this.loans);
  currentLoansData = this.loansSource.asObservable();

  private freeMonySource = new BehaviorSubject<any>(this.freeMony);
  currentFreeMonyData = this.freeMonySource.asObservable();

  private encomingsSumSource = new BehaviorSubject<any>(this.encomingSum);
  currentEncomingsSumData = this.encomingsSumSource.asObservable();

  private spendingsSumSource = new BehaviorSubject<any>(this.spendingSum);
  currentSpendingsSumData = this.spendingsSumSource.asObservable();

  private cellsSumSource = new BehaviorSubject<any>(this.cellsSum);
  currentCellsSumData = this.cellsSumSource.asObservable();

  private loansSumSource = new BehaviorSubject<any>(this.loansSum);
  currentloansSumData = this.loansSumSource.asObservable();

  private loggedIn = new BehaviorSubject<any>("");
  isLoggedIn = this.loggedIn.asObservable();

  refreshLogegIn(newLogin){
    this.currentUser = newLogin;
    this.loggedIn.next(newLogin);
  }

  refreshUser(newData){
    this.userSource.next(newData)
  }

  deleteUserSubsribe(){
    this.userSource.unsubscribe()
  }

  refreshEncomings(newData){
    this.encomingsSource.next(newData);
    this.encomings = newData;
    if(this.encomings.length > 0){
      this.getEncomingsSum();
      this.getFreeMony();
    }
  }

  deleteEncomingSubsribe(){
    this.encomingsSource.unsubscribe()
  }

  refreshSpendings(newData){
    this.spendingsSource.next(newData);
    this.spendings = newData;
    if(this.spendings.length > 0){
      this.getSpendingsSum();
      this.getFreeMony();
    }
  }

  deleteSpendingSubsribe(){
    this.spendingsSource.unsubscribe()
  }

  refreshCells(newData){
    this.cellsSource.next(newData);
    this.cells = newData
    if(this.cells.length > 0){
      this.getCellsSum();
      this.getFreeMony();
    }
  }

  deleteCellsSubsribe(){
    this.cellsSource.unsubscribe()
  }

  refreshLoans(newData){
    this.loansSource.next(newData);
    this.loans = newData;
    if(this.loans.length > 0){
      this.getLoansSum();
      this.getFreeMony();
    }
  }

  deleteloansSubsribe(){
    this.loansSource.unsubscribe()
  }

  refreshFreeMony(newData){
    this.freeMonySource.next(newData)
  }

  deleteFreeMonySubsribe(){
    this.freeMonySource.unsubscribe()
  }

  refreshSpendingsSum(newData){
    this.spendingsSumSource.next(newData)
  }

  deleteSpendingSumSubsribe(){
    this.spendingsSumSource.unsubscribe()
  }

  refreshEncomingsSum(newData){
    this.encomingsSumSource.next(newData)
  }

  deleteEncomingSumSubsribe(){
    this.encomingsSumSource.unsubscribe()
  }

  refreshCellsSum(newData){
    this.cellsSumSource.next(newData)
  }

  deleteCellsSumSubsribe(){
    this.cellsSumSource.unsubscribe()
  }

  refreshLoansSum(newData){
    this.loansSumSource.next(newData)
  }

  deleteLoansSumSubsribe(){
    this.loansSumSource.unsubscribe()
  }

  getSpendingsSum(){
    let sum = 0;
    for(let spending of this.spendings){
      (sum+= spending.amount)
    }
    this.spendingSum = sum;
    this.refreshSpendingsSum(sum)
  }

  getEncomingsSum(){
    let sum = 0;
    for(let encoming of this.encomings){
      sum += encoming.amount;
    }
    this.encomingSum = sum;
    this.refreshEncomingsSum(sum)
  }

  getCellsSum(){
    let sum: number = 0;
    this.cells.forEach((item: any) => sum += item.acamulated);
    this.cellsSum = sum;
    this.refreshCellsSum(sum)
  }

  getLoansSum(){
    let sum:number = 0;
    this.loans.forEach(function(item){
      return sum += Number(item.amount);
    })
    this.loansSum =  sum;
    this.refreshLoansSum(sum)
  }

  getFreeMony(){
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
