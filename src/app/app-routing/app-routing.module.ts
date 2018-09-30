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
    {path: 'cadastrar/aluno', component: FormAlunoComponent}
    
    
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
  