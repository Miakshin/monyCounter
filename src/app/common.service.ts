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
    return this.http.get<any>("http://localhost:3043/incomes");
    }

  getReportsByType(type){
      return this.http.get<any>(`http://localhost:3043/reports/${type}`);
    }

  postData(data, dataType) {
    return this.http.post(`http://localhost:3043/report/${dataType}`, data);
  }

  getUserByLogin(login){
    return this.http.get(`http://localhost:3043/user/${login}`);
  }

}
