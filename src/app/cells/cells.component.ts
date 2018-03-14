import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent implements OnInit {

  login: string = "admin";
  cells: any;
  activeCells: any;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getAllCells()
  }

  getAllCells(){
    this.commonService.getReportsByType("cell")
    .subscribe((data)=>{this.cells = data;
    this.getActiveCells();
    })
  }

  getActiveCells(){
    this.commonService.getUserByLogin("admin")
    .subscribe((user)=>{
      this.activeCells = user.setings.activCells;}
    )
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
    .subscribe(()=>{clearForm();
      this.getActiveCells()})
  }

  onCheckedChange(event){
    let data={id: event.target.name}
    this.commonService.changeSettings(this.login, "activCells", data).subscribe((user)=>{
      this.activeCells = user.setings.activCells
    })
  }

  isCellActive(id){
     return(this.activeCells.indexOf(id) === -1 ? false : true)
  }
}
