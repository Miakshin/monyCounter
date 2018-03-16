import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-cells-cell',
  templateUrl: './cell.component.html',
  // styleUrls: ['./cells.component.css']
})
export class CellComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit(){}
}
