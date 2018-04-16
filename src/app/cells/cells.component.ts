import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { Cell } from './cell/cell'

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent implements OnInit {

  cells: Cell[];
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
      });
    }

  ngOnInit():void {
    this.commonService.currentCellsData
      .subscribe(cells => this.cells = cells);
    this.commonService.currentUserData
      .subscribe(user => {
        if(user){this.activeCells = user.setings.activCells}
      });

  }

  createCell():void{
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
      this.commonService.getReportsByType("cell")
      .subscribe(cells => this.commonService.refreshCells(cells))
})
  }

  onCheckedChange(event):void{
    let data={id: event.target.name}
    this.commonService.changeSettings(document.cookie.slice(6), "activCells", data)
    .subscribe(user=>this.commonService.refreshUser(user))
  }

  isCellActive(id):boolean{
     return(this.activeCells.indexOf(id) === -1 ? false : true)
  }
}
