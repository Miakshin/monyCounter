import { NgModule }                      from '@angular/core';
import { RouterModule, Routes }          from '@angular/router';
import { MainInformationComponent }      from './main-information/main-information.component';
import { SettingsComponent }             from './settings/settings.component';
import { EncomingAndSpendingComponent }      from './encoming-and-spending/encoming-and-spending.component';

const routes: Routes = [
  { path: 'main', component: MainInformationComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'inandout', component: EncomingAndSpendingComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
