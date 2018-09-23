import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// home
import { HomeComponent } from '../components/home/home.component';

// colegio
import { ListColegiosComponent } from '../components/colegio/list-colegios/list-colegios.component';
import { FormColegioComponent } from '../components/colegio/form-colegio/form-colegio.component';
import { ListVeiculosComponent } from '../components/veiculo/list-veiculos/list-veiculos.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},

    // Colegio
    {path: 'listagem/colegios', component: ListColegiosComponent},
    {path: 'cadastrar/colegio', component: FormColegioComponent},
 
    // Veiculo
    {path: 'listagem/veiculos', component: ListVeiculosComponent}
    
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
  