import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { settings } from './settings';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  login: string = "admin";
  activeLink :string = "account";
  settings: settings[];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getSettins();
  }

  getSettins(){
    this.commonService.getUserByLogin(this.login)
      .subscribe(user=>{
        this.settings = user.setings;
        console.log(this.settings);
      })
  }

  pick(event){
    this.activeLink = event.target.name;
    let aNavs = document.querySelectorAll("[class ^= nav-link]");
    for(let i=0; i<aNavs.length; i++){
      aNavs[i].className="nav-link"
    }
    event.target.className = "nav-link active"
  }

  onCheckedChange(event){
    let data={value: event.target.name}
    this.commonService.changeSettings(this.login, "activeCurancy", data).subscribe(console.log)
  }

}
