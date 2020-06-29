import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdComponent } from './ad/ad.component';
import { HomeComponent } from './home/home.component';
import { SaleComponent } from './sale/sale.component';
import { DetailsComponent } from './details/details.component';
import { BlockComponent } from './block/block.component';
import { UserComponent } from './user/user.component';
import { DisposalComponent } from './disposal/disposal.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RootComponent } from './root/root.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthorizationComponent,
    RegistrationComponent,
    AdComponent,
    HomeComponent,
    SaleComponent,
    DetailsComponent,
    BlockComponent,
    UserComponent,
    DisposalComponent,
    AdminComponent,
    DashboardComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,





  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
