import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent implements OnInit {

  cells;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getAllCells()
  }

  getAllCells(){
    this.commonService.getReportsByType("cell")
    .subscribe((data)=>this.cells = data)
  }

  createCell(){
    let form = eval(`document.forms.createCell`);
    let data;
    data = {
      name: form.elements.name.value,
      tax: form.elements.tax.value,
      acamulated: form.elements.acamulated.value,
      createAt: Date.now()
    }
    let clearForm =()=>{
      form.reset()
    }
    this.commonService.postData(data, "cell")
    .subscribe(()=>clearForm())
  }
}
