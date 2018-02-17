import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})
export class MainInformationComponent implements OnInit {

  total: number = 500;
  freeMony: number = 112;
  cells = {
    investigetion : 45,
    house: 60
  }

  constructor() { }

  ngOnInit() {
  }

}
