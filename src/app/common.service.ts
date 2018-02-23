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

  postData(incomesData) {
    console.log(incomesData);
    return this.http.post("http://localhost:3040/incomes", incomesData);
  }

}
