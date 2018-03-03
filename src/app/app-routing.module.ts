import { NgModule }                      from '@angular/core';
import { RouterModule, Routes }          from '@angular/router';
import { MainInformationComponent }      from './main-information/main-information.component';
import { SettingsComponent }             from './settings/settings.component';
import { EncomingAndSpendingComponent }      from './encoming-and-spending/encoming-and-spending.component';
import { LoansComponent }      from './loans/loans.component';
import { CellsComponent }      from './cells/cells.component';

const routes: Routes = [
  { path: 'main', component: MainInformationComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'inandout', component: EncomingAndSpendingComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'cells', component: CellsComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
