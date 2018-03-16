import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommonService {


  constructor(private http: HttpClient) { }

  setData(date,amount){
    // let mony = mongoose.model()
  }

  getData() {
    return this.http.get<any>("http://localhost:3041/incomes");
    }

  getCellById(id){
    return this.http.get<any>(`http://localhost:3041/cells/${id}`)
    .toPromise()
  }

  getReportsByType(type): Observable<any>{
      return this.http.get<any>(`http://localhost:3041/reports/${type}`);
    }

  postData(data, dataType) {
    return this.http.post<any>(`http://localhost:3041/report/${dataType}`, data)
    // .toPromise()
  }

  getUserByLogin(login): Observable<any>{
      return this.http.get<any>(`http://localhost:3041/user/${login}`);
  }

  addRepotrToCell(id, repotr){
    return this.http.post<any>(`http://localhost:3041/cells/${id}`, repotr)
  }

  changeSettings(user, type, params){
    return this.http.post<any>(`http://localhost:3041/user/${user}/settings/${type}`, params)
  }

}
