import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-short-information',
  templateUrl: './short-information.component.html',
  styleUrls: ['./short-information.component.css']
})
export class ShortInformationComponent implements OnInit {
  @Input() user: string = "loading";
  @Input() freeMony: number = 0;
  curancy: string = "UAH";

  constructor() { }

  ngOnInit() {
  }

}
