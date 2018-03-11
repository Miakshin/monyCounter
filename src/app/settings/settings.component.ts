import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings = {};

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getSettins()
  }

  getSettins(){
    this.commonService.getUserByLogin("admin")
      .subscribe(user=>{
        this.settings = user.setings;
        console.log(this.settings);
      })
  }
}
