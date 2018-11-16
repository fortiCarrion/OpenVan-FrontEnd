import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// home
import { HomeComponent } from '../components/home/home.component';

// colegio
import { ListColegiosComponent } from '../components/colegio/list-colegios/list-colegios.component';
import { FormColegioComponent } from '../components/colegio/form-colegio/form-colegio.component';
import { ListVeiculosComponent } from '../components/veiculo/list-veiculos/list-veiculos.component';
import { FormVeiculosComponent } from '../components/veiculo/form-veiculos/form-veiculos.component';
import { ListAlunosComponent } from '../components/aluno/list-alunos/list-alunos.component';
import { FormAlunoComponent } from '../components/aluno/form-aluno/form-aluno.component';
import { MensalidadeComponent } from '../components/mensalidade/mensalidade.component';
import { RelatoriosComponent } from '../components/relatorios/relatorios.component';
import { GeralComponent } from '../components/relatorios/geral/geral.component';
import { RelatorioAlunosComponent } from '../components/relatorios/relatorio-alunos/relatorio-alunos.component';
import { RelatorioVeiculosComponent } from '../components/relatorios/relatorio-veiculos/relatorio-veiculos.component';
import { RelatorioColegiosComponent } from '../components/relatorios/relatorio-colegios/relatorio-colegios.component';
import { PendenteComponent } from '../components/relatorios/pendente/pendente.component';
import { AtrasadoComponent } from '../components/relatorios/atrasado/atrasado.component';
import { QuitadoComponent } from '../components/relatorios/quitado/quitado.component';
import { ManualMensalidadeComponent } from '../components/relatorios/manual-mensalidade/manual-mensalidade.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},

    // Colegio
    {path: 'listagem/colegios', component: ListColegiosComponent},
    {path: 'cadastrar/colegio', component: FormColegioComponent},
 
    // Veiculo
    {path: 'listagem/veiculos', component: ListVeiculosComponent},
    {path: 'cadastrar/veiculo', component: FormVeiculosComponent},

    // Aluno
    {path: 'listagem/alunos', component: ListAlunosComponent},
    {path: 'cadastrar/aluno', component: FormAlunoComponent},

    // Mensalidade
    {path: 'listagem/mensalidades', component: MensalidadeComponent},

    // Relatorios
    {path: 'geracao/relatorios', component: RelatoriosComponent},
    {path: 'geracao/relatorios/geral', component: GeralComponent},
    {path: 'geracao/relatorios/pendente', component: PendenteComponent},
    {path: 'geracao/relatorios/atrasado', component: AtrasadoComponent},
    {path: 'geracao/relatorios/quitado', component: QuitadoComponent},
    {path: 'geracao/relatorios/alunos', component: RelatorioAlunosComponent},
    {path: 'geracao/relatorios/veiculos', component: RelatorioVeiculosComponent},
    {path: 'geracao/relatorios/colegios', component: RelatorioColegiosComponent},
    {path: 'geracao/relatorios/manualMensalidade', component: ManualMensalidadeComponent}

  ];
  
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }
  