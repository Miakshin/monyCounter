import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private commonService: CommonService,
              private _router: ActivatedRoute) {
  this.cellId = this._router.snapshot.paramMap.get('id');
  this.spendFormOpened = false;
             }

  ngOnInit(){
    this.commonService.getCellById(this.cellId)
    .then((cell)=>this.cell = cell)
  }

}
