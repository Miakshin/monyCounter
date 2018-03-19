import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent implements OnInit {

  login: string = "admin";
  cells: any;
  activeCells: any;
  createCellFormGroup: FormGroup;

  constructor(private commonService: CommonService) {
    this.createCellFormGroup = new FormGroup({
      "name": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
      "tax": new FormControl("",[
        Validators.required,
        Validators.pattern("^[0-9]{1,3}")
      ]),
      "color": new FormControl("", Validators.required),
      "acamulated": new FormControl("",[
        Validators.required,
        Validators.pattern("^[0-9]{1,12}")
      ]),
      });}

  ngOnInit() {
    this.getAllCells()
  }

  getAllCells(){
    this.commonService.getReportsByType("cell")
    .subscribe((data)=>{this.cells = data;
      console.log(data);
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
    let data = {
      name: this.createCellFormGroup.value.name,
      tax: this.createCellFormGroup.value.tax,
      acamulated: this.createCellFormGroup.value.acamulated,
      diagramColor: this.createCellFormGroup.value.color,
      createAt: Date.now()
    }
    this.commonService.postData(data, "cell")
    .subscribe(()=>{
      this.createCellFormGroup.reset();
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
