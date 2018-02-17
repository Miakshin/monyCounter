import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-information',
  templateUrl: './short-information.component.html',
  styleUrls: ['./short-information.component.css']
})
export class ShortInformationComponent implements OnInit {

  user: string = "User Name";
  freeMony: number = 112;
  curancy: string = "usd";

  constructor() { }

  ngOnInit() {
  }

}
