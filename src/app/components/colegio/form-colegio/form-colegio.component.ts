import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ColegioService } from '../../../services/domain/colegio.service';

@Component({
  selector: 'app-form-colegio',
  templateUrl: './form-colegio.component.html',
  styleUrls: ['./form-colegio.component.css']
})
export class FormColegioComponent implements OnInit {

  formGroup: FormGroup;

  title = 'Cadastrar Colégio';

  redes = ['Estadual', 'Municipal', 'Particular'];
  http: any;
  //model: ColegioDTO = new ColegioDTO(-1, null, '', '', null, '', '',null);

  constructor(
    private location: Location,
    private colegioService: ColegioService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      rede: [this.redes[0], [Validators.required]],
      nome: ['maxi', [Validators.required,Validators.minLength(4), Validators.maxLength(50)]],
      endereco: ['av. ra', [Validators.required,Validators.minLength(10), Validators.maxLength(50)]],
      numero: ['1234', [Validators.required,Validators.minLength(1), Validators.maxLength(5)]],
      telefone: ['33456845', [Validators.minLength(8), Validators.maxLength(14)]],
      website: ['www.asdads.', [Validators.minLength(10), Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    //this.formGroup.controls.rede.setValue(this.redes[1]);
  }

  onSubmit(): void {
    console.log("onsubmit");
  }

}
