import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommonService {


  constructor(private http: HttpClient) { }

  setData(date,amount){
    // let mony = mongoose.model()
  }

  getData() :  Observable<any> {
    return this.http.get<any>("http://localhost:3041/incomes");
  }

  // getData(){
  //   return new Promise(function(resolve, reject) {
  //
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', "http://localhost:3041/incomes" , true);
  //   xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  //   xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  //   xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  //
  //   xhr.onload = function() {
  //     if (xhr.status == 200) {
  //       resolve(xhr.response);
  //     } else {
  //       var error = new Error(xhr.statusText);
  //       reject(error);
  //     }
  //   };
  //
  //   xhr.onerror = function() {
  //     reject(new Error("Network Error"));
  //   };
  //
  //   xhr.send();
  // });
  // }
}
