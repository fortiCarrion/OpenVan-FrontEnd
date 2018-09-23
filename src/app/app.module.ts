import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Modules
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

// Services
import { ColegioService } from './services/domain/colegio.service';
import { ListColegiosComponent } from './components/colegio/list-colegios/list-colegios.component';
import { HomeComponent } from './components/home/home.component';
import { FormColegioComponent } from './components/colegio/form-colegio/form-colegio.component';
import { ListVeiculosComponent } from './components/veiculo/list-veiculos/list-veiculos.component';
import { VeiculoService } from './services/domain/veiculo.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListColegiosComponent,
    HomeComponent,
    FormColegioComponent,
    ListVeiculosComponent
  ],
  imports: [
    BrowserModule,
    AppBootstrapModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ColegioService,
    VeiculoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
