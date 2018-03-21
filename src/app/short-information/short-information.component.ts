import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-short-information',
  templateUrl: './short-information.component.html',
  styleUrls: ['./short-information.component.css']
})
export class ShortInformationComponent implements OnInit {
  @Input() user: string = "loading";
  @Input() freeMony: number;
  curancy: string = "UAH";

  constructor() { }

  ngOnInit() {
  }

}
