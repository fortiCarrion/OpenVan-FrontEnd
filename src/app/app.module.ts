import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatListModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule
  ],
  providers: [
    ColegioService,
    VeiculoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
