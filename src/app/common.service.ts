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

  getReportsByType(type){
      return this.http.get<any>(`http://localhost:3040/incomes/${type}`);
    }

  getReportSum(param){
    return this.http.get<any>(`http://localhost:3040/incomesSum/${param}`);
  }

  postData(incomesData) {
    return this.http.post("http://localhost:3040/incomes", incomesData);
  }

}
