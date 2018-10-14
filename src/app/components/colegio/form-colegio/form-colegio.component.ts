import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ColegioService } from '../../../services/domain/colegio.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-form-colegio',
  templateUrl: './form-colegio.component.html',
  styleUrls: ['./form-colegio.component.css']
})
export class FormColegioComponent implements OnInit {

  formGroup: FormGroup;
  modalRef: BsModalRef;

  modal_success: TemplateRef<any>;
  modal_error: TemplateRef<any>;

  error_message: string;

  title = 'Cadastrar Colégio';

  redes = ['Estadual', 'Municipal', 'Particular'];
  http: any;

  constructor(
    private location: Location,
    private colegioService: ColegioService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalService: BsModalService
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
    this.toNumRede(this.formGroup.controls['rede'].value);
    this.insert();
  }

  insert() {
    //console.log(this.formGroup.value);
    this.colegioService.insert(this.formGroup.value)
      .subscribe(response => {
        this.goBack();
        this.openModal(this.modal_success);
      },

        error => {
          this.openModal(this.modal_error);
          switch (error.status) {

            case 400:

              this.error_message = "Nome do colégio já cadastrado, favor registrar outro nome."
              break;

            default:

              this.error_message = error.message;
          }

         });
  }

  toNumRede(rede: string) {

    if (rede == "Estadual") {
      this.formGroup.patchValue({ "rede": "1" });
    } else if (rede == "Municipal") {
      this.formGroup.patchValue({ "rede": "2" });
    } else {
      this.formGroup.patchValue({ "rede": "0" });
    }
  }
  goBack(): void {
    this.location.back();
  }

  openModal(generico: TemplateRef<any>) {
    this.modalRef = this.modalService.show(generico);
    setTimeout(this.modalRef.hide, 4000);
  }

}
