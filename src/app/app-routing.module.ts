import { NgModule }                      from '@angular/core';
import { RouterModule, Routes }          from '@angular/router';
import { MainInformationComponent }      from './main-information/main-information.component';
import { SettingsComponent }             from './settings/settings.component';
import { EncomingAndSpendingComponent }      from './encoming-and-spending/encoming-and-spending.component';
import { LoansComponent }      from './loans/loans.component';
import { CellsComponent }      from './cells/cells.component';
import { CellComponent }      from './cells/cell/cell.component';
import { EntranceComponent } from './entrance/entrance.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'main', component: MainInformationComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'inandout', component: EncomingAndSpendingComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: LoansComponent, canActivate: [AuthGuard] },
  { path: 'cells', component: CellsComponent , canActivate: [AuthGuard]},
  { path: 'cells/:id', component: CellComponent, canActivate: [AuthGuard] },
  { path: 'login', component: EntranceComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
