import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { AdComponent } from './ad/ad.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { DisposalComponent } from './disposal/disposal.component';
import { AdminComponent } from './admin/admin.component';
import { RootComponent } from './root/root.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'authorization', component: AuthorizationComponent},
  { path: '', component: HomeComponent},
  { path: 'user', component: UserComponent},
  { path: 'details', component: DetailsComponent},
  { path: 'disposal', component: DisposalComponent},
  { path: 'ad', component: AdComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'root', component: RootComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
