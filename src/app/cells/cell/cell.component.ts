import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { ActivatedRoute } from '@angular/router';
import {  FormGroup, FormControl, Validators }   from '@angular/forms';

import { Cell } from './cell';

@Component({
  selector: 'app-cells-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  cellId: string;
  cell: Cell;
  spendFormOpened: boolean;
  borrowFromCellFormGroup: FormGroup;

  constructor(private commonService: CommonService,
              private _router: ActivatedRoute) {
    this.cellId = this._router.snapshot.paramMap.get('id');
    this.spendFormOpened = false;

    this.borrowFromCellFormGroup = new FormGroup({
      "description": new FormControl("", [
        Validators.required,
        Validators.pattern("[^{}*<>]{2,55}")
      ]),
      "amount": new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]{1,9}")
      ]),
    })
  }

  ngOnInit():void{
    console.log(this.borrowFromCellFormGroup)
    this.commonService.getCellById(this.cellId)
    .then((cell)=>this.cell = cell)
  }

  createBorrowFromCell():void{
    let data = this.borrowFromCellFormGroup.value;
    this.commonService.addSpendingToCell(this.cellId, data)
      .subscribe(()=>{
        this.borrowFromCellFormGroup.reset()
        this.commonService.getReportsByType("cell")
        .subscribe(cells => this.commonService.refreshCells(cells))
      })
  }

}
