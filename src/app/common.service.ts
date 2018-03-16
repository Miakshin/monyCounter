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
    return this.http.get<any>("http://localhost:3052/incomes");
    }

  getCellById(id){
    return this.http.get<any>(`http://localhost:3052/cells/${id}`)
    .toPromise()
  }

  getReportsByType(type): Observable<any>{
      return this.http.get<any>(`http://localhost:3052/reports/${type}`);
    }

  postData(data, dataType) {
    return this.http.post<any>(`http://localhost:3052/report/${dataType}`, data)
    // .toPromise()
  }

  getUserByLogin(login): Observable<any>{
      return this.http.get<any>(`http://localhost:3052/user/${login}`);
  }

  addRepotrToCell(id, repotr){
    return this.http.post<any>(`http://localhost:3052/cells/${id}`, repotr)
  }

  changeSettings(user, type, params){
    return this.http.post<any>(`http://localhost:3052/user/${user}/settings/${type}`, params)
  }

}
