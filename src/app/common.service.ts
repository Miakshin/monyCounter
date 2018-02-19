import { Injectable } from '@angular/core';
import { mongoose } from 'mongoose';

@Injectable()
export class CommonService {

  incomeSchema = mongoose.Schema({
  date: Number,
  amount: Number
});

  url:string = "mongodb://admin:admin@ds125198.mlab.com:25198/mony";

  constructor() { }

  setUpConnect():void {
    mongoose.connect(this.url);
  }
  setData(date,amount){
    // let mony = mongoose.model()
  }
  getData(){

  }
}
