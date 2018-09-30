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

  constructor(
    private location: Location,
    private colegioService: ColegioService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      rede: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      endereco: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      telefone: ['', [Validators.minLength(8), Validators.maxLength(14)]],
      website: ['', [Validators.minLength(10), Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
   
  }

  onSubmit(): void {
    console.log("onsubmit");
    this.toNumRede(this.formGroup.controls['rede'].value);
    this.insert();
  }

  insert() {
    console.log(this.formGroup.value);
    this.colegioService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },

        error => { });
  }

  showInsertOk() {
    console.log("criado");
  }

  toNumRede(rede: string) {

    if (rede == "Estadual") {
      this.formGroup.patchValue({ "rede": "1" });
    } else if (rede == "Municipal") {
      this.formGroup.patchValue({ "rede": "2" });
    } else {
      this.formGroup.patchValue({ "rede": "3" });
    }
  }
  goBack(): void {
    this.location.back();
  }

}
