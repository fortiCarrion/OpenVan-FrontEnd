import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VeiculoService } from '../../../services/domain/veiculo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-form-veiculos',
  templateUrl: './form-veiculos.component.html',
  styleUrls: ['./form-veiculos.component.css']
})
export class FormVeiculosComponent implements OnInit {

  formGroup: FormGroup;
  modalRef: BsModalRef;

  modal_success: TemplateRef<any>;
  modal_error: TemplateRef<any>;

  error_message: string;

  title = 'Cadastrar Veículo';

  status = ['Ativo', 'Inativo', 'Manutenção'];
  http: any;

  constructor(
    private location: Location,
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.formGroup = this.formBuilder.group({
      status: [this.status[0], [Validators.required]],
      condutor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      modelo: ['', [Validators.maxLength(50)]],
      ano: ['', [Validators.minLength(4), Validators.maxLength(4)]],
      recado: [null, [Validators.maxLength(150)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.toEnumStatus(this.formGroup.controls['status'].value);
    //console.log(this.formGroup.value);
    this.insert();

  }

  goBack(): void {
    this.location.back();
  }

  toEnumStatus(status: string) {
    if (status == "Ativo") {
      this.formGroup.patchValue({ "status": 0 });
    } else if (status == "Inativo") {
      this.formGroup.patchValue({ "status": 1 });
    } else {
      this.formGroup.patchValue({ "status": 2 });
    }
  }
  openModal(generico: TemplateRef<any>) {
    this.modalRef = this.modalService.show(generico);
    setTimeout(this.modalRef.hide, 4000);
  }

  insert() {
    this.veiculoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.goBack();
        this.openModal(this.modal_success);
      },
        error => {
          this.openModal(this.modal_error);
          this.formGroup.patchValue({ "status": this.status[0] });
          switch (error.status) {

            case 400:

              this.error_message = "Número do veículo já cadastrado, favor registrar outro número."
              break;

            default:

              this.error_message = error.message;
          }

        });
  }
}
