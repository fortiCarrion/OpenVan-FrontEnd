import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Modules
import { AppRoutingModule } from './app-routing/app-routing.module';

// Services
import { ColegioService } from './services/domain/colegio.service';
import { ListColegiosComponent } from './components/colegio/list-colegios/list-colegios.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListColegiosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ColegioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
