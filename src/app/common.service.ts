import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommonService {


  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any>("http://localhost:3046/incomes");
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
