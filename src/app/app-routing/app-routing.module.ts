import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListColegiosComponent } from '../components/colegio/list-colegios/list-colegios.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'listagem/colegios', component: ListColegiosComponent}
 
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
  