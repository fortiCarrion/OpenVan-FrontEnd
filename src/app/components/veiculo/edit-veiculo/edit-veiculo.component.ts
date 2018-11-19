import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { VeiculoService } from '../../../services/domain/veiculo.service';
import { ActivatedRoute } from '@angular/router';
import { VeiculoDTO } from '../../../models/veiculo.dto';

@Component({
  selector: 'app-edit-veiculo',
  templateUrl: './edit-veiculo.component.html',
  styleUrls: ['./edit-veiculo.component.css']
})
export class EditVeiculoComponent implements OnInit {

  formGroup: FormGroup;
  modalRef: BsModalRef;

  modal_success: TemplateRef<any>;
  modal_error: TemplateRef<any>;

  error_message: string;

  year = new Date().getFullYear();

  title = '';

  veiculo: VeiculoDTO;

  // status = ['Ativo', 'Inativo', 'Manutenção'];
  status = ['ATIVO', 'INATIVO', 'MANUTENÇÃO'];
  http: any;

  constructor(
    private location: Location,
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalService: BsModalService) {
    this.formGroup = this.formBuilder.group({
      status: ['', [Validators.required]],
      condutor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      numero: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
      modelo: ['', [Validators.maxLength(50)]],
      ano: ['', [Validators.min(1997), Validators.max(this.year)]],
      recado: [null, [Validators.maxLength(150)]]
    });
  }

  ngOnInit() {
    this.getVeiculo();
  }


  onSubmit() {
    //this.toEnumStatus(this.formGroup.controls['status'].value);
    //console.log(this.formGroup.value);
    this.update();
    console.log(this.formGroup.value);
  }

  goBack(): void {
    this.location.back();
  }


  getVeiculo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.veiculoService.findOne(id)
      .subscribe(response => {
        this.veiculo = response;
        this.title = 'Editar Veículo ' + this.veiculo.numero;
        //console.log(this.colegio)

        this.formGroup.patchValue({ "status": this.veiculo.status });
        this.formGroup.patchValue({ "condutor": this.veiculo.condutor });
        this.formGroup.patchValue({ "numero": this.veiculo.numero });
        this.formGroup.patchValue({ "modelo": this.veiculo.modelo });
        this.formGroup.patchValue({ "ano": this.veiculo.ano });
        this.formGroup.patchValue({ "recado": this.veiculo.recado });


      },
        error => {
          console.log(error);
          this.openModalNotFound(this.modal_error);

          this.error_message = error.msg;

        });
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
  
  openModalNotFound(generico: TemplateRef<any>) {
    this.modalRef = this.modalService.show(generico);
  }
  
  openModal(generico: TemplateRef<any>) {
    this.modalRef = this.modalService.show(generico);
    setTimeout(this.modalRef.hide, 4000);
  }

  
  update() {
    //console.log(this.formGroup.value);
    this.veiculoService.update(this.formGroup.value, this.veiculo.id)
      .subscribe(response => {
        this.goBack();
        this.openModal(this.modal_success);
      },

        error => {
          console.log(error);
          this.openModal(this.modal_error);
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
