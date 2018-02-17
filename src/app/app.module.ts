import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainInformationComponent } from './main-information/main-information.component';
import { SettingsComponent } from './settings/settings.component';
import { EncomingAndSpendingComponent } from './encoming-and-spending/encoming-and-spending.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoansComponent } from './loans/loans.component';
import { EntranceComponent } from './entrance/entrance.component';
import { ShortInformationComponent } from './short-information/short-information.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainInformationComponent,
    SettingsComponent,
    EncomingAndSpendingComponent,
    LoansComponent,
    EntranceComponent,
    ShortInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
