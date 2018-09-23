/**
 * ngx-bootstrap
 * Modulo responsável pela integração dos componentes do Bootstrap 4.
 * Documentação: https://valor-software.com/ngx-bootstrap/#/
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule, BsDropdownModule, TooltipModule, ModalModule, PopoverModule, RatingModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    RatingModule.forRoot()
  ],
  exports: [
    CollapseModule, BsDropdownModule, TooltipModule, ModalModule, PopoverModule, RatingModule
  ]
})
export class AppBootstrapModule { }
