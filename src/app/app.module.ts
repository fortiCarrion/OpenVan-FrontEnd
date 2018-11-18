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
import { FormVeiculosComponent } from './components/veiculo/form-veiculos/form-veiculos.component';
import { ListAlunosComponent } from './components/aluno/list-alunos/list-alunos.component';
import { AlunoService } from './services/domain/aluno.service';
import { FormAlunoComponent } from './components/aluno/form-aluno/form-aluno.component';
import { MensalidadeComponent } from './components/mensalidade/mensalidade.component';
import { MensalidadeService } from './services/domain/mensalidade.service';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { GeralComponent } from './components/relatorios/geral/geral.component';
import { RelatorioCabecalhoComponent } from './components/relatorios/relatorio-cabecalho/relatorio-cabecalho.component';
import { RelatorioAlunosComponent } from './components/relatorios/relatorio-alunos/relatorio-alunos.component';
import { RelatorioColegiosComponent } from './components/relatorios/relatorio-colegios/relatorio-colegios.component';
import { RelatorioVeiculosComponent } from './components/relatorios/relatorio-veiculos/relatorio-veiculos.component';
import { PendenteComponent } from './components/relatorios/pendente/pendente.component';
import { AtrasadoComponent } from './components/relatorios/atrasado/atrasado.component';
import { QuitadoComponent } from './components/relatorios/quitado/quitado.component';
import { ManualMensalidadeComponent } from './components/relatorios/manual-mensalidade/manual-mensalidade.component';
import { EditColegioComponent } from './components/colegio/edit-colegio/edit-colegio.component';
import { EditVeiculoComponent } from './components/veiculo/edit-veiculo/edit-veiculo.component';
import { EditAlunoComponent } from './components/aluno/edit-aluno/edit-aluno.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListColegiosComponent,
    HomeComponent,
    FormColegioComponent,
    ListVeiculosComponent,
    FormVeiculosComponent,
    ListAlunosComponent,
    FormAlunoComponent,
    MensalidadeComponent,
    RelatoriosComponent,
    GeralComponent,
    RelatorioCabecalhoComponent,
    RelatorioAlunosComponent,
    RelatorioColegiosComponent,
    RelatorioVeiculosComponent,
    PendenteComponent,
    AtrasadoComponent,
    QuitadoComponent,
    ManualMensalidadeComponent,
    EditColegioComponent,
    EditVeiculoComponent,
    EditAlunoComponent
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
    VeiculoService,
    AlunoService,
    MensalidadeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
