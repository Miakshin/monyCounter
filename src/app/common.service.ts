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
    return this.http.get<any>("http://localhost:3040/incomes");
    }

  getCellById(id){
    return this.http.get<any>(`http://localhost:3040/cells/${id}`)
  }

  getReportsByType(type): Observable<any>{
      return this.http.get<any>(`http://localhost:3040/reports/${type}`);
    }

  postData(data, dataType) {
    return this.http.post<any>(`http://localhost:3040/report/${dataType}`, data);
  }

  getUserByLogin(login): Observable<any>{
      return this.http.get<any>(`http://localhost:3040/user/${login}`);
  }

  addRepotrToCell(id, repotr){
    return this.http.post<any>(`http://localhost:3040/cells/${id}`, repotr)
  }

}
