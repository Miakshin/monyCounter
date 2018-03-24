import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainInformationComponent } from './main-information/main-information.component';
import { SettingsComponent } from './settings/settings.component';
import { EncomingAndSpendingComponent } from './encoming-and-spending/encoming-and-spending.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoansComponent } from './loans/loans.component';
import { EntranceComponent } from './entrance/entrance.component';
import { ShortInformationComponent } from './short-information/short-information.component';
import { CommonService } from './common.service';
import { CellsComponent } from './cells/cells.component';
import { CellComponent } from './cells/cell/cell.component';
import { CanvasComponent } from './main-information/canvas/canvas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainInformationComponent,
    SettingsComponent,
    EncomingAndSpendingComponent,
    LoansComponent,
    EntranceComponent,
    ShortInformationComponent,
    CellsComponent,
    CellComponent,
    CanvasComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
