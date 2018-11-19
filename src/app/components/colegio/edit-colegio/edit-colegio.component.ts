import { Component, OnInit, TemplateRef } from '@angular/core';
import { ColegioService } from '../../../services/domain/colegio.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ColegioDTO } from '../../../models/colegio.dto';

@Component({
  selector: 'app-edit-colegio',
  templateUrl: './edit-colegio.component.html',
  styleUrls: ['./edit-colegio.component.css']
})
export class EditColegioComponent implements OnInit {

  // colegio_nome: String = '';
  // title: String = 'Editar Colégio ' + this.colegio_nome;
  title: String = '';
  formGroup: FormGroup;
  modalRef: BsModalRef;

  modal_success: TemplateRef<any>;
  modal_error: TemplateRef<any>;

  error_message: string;

  //redes = ['Estadual', 'Municipal', 'Particular'];
  redes = ['ESTADUAL', 'MUNICIPAL', 'PARTICULAR'];
  http: any;
  colegio: ColegioDTO;


  constructor(
    private location: Location,
    private colegioService: ColegioService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalService: BsModalService) {
    this.formGroup = this.formBuilder.group({
      rede: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      endereco: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      numero: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
      telefone: ['', [Validators.minLength(8), Validators.maxLength(14)]],
      website: ['', [Validators.minLength(10), Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    this.getColegio();
    //this.id = +this.route.snapshot.paramMap.get('id');
    //console.log(this.id);

  }

  getColegio(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.colegioService.findOne(id)
      .subscribe(response => {
        this.colegio = response;
        this.title = 'Editar Colégio ' + this.colegio.nome;
        //console.log(this.colegio)

        this.formGroup.patchValue({ "rede": this.colegio.rede });
        this.formGroup.patchValue({ "nome": this.colegio.nome });
        this.formGroup.patchValue({ "endereco": this.colegio.endereco });
        this.formGroup.patchValue({ "numero": this.colegio.numero });
        this.formGroup.patchValue({ "telefone": this.colegio.telefone });
        this.formGroup.patchValue({ "website": this.colegio.website });


      },
        error => {
          console.log(error);
          this.openModalNotFound(this.modal_error);

          this.error_message = error.msg;

        });
  }

  onSubmit(): void {
    //this.toNumRede(this.formGroup.controls['rede'].value);
    this.update();
    console.log(this.formGroup.value);
  }

  update() {
    //console.log(this.formGroup.value);
    this.colegioService.update(this.formGroup.value, this.colegio.id)
      .subscribe(response => {
        this.goBack();
        this.openModal(this.modal_success);
      },

        error => {
          console.log(error);
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
      this.formGroup.patchValue({ "rede": "ESTADUAL" });
    } else if (rede == "Municipal") {
      this.formGroup.patchValue({ "rede": "MUNICIPAL" });
    } else {
      this.formGroup.patchValue({ "rede": "PARTICULAR" });
    }
  }

  goBack(): void {
    this.location.back();
  }

  openModal(generico: TemplateRef<any>) {
    this.modalRef = this.modalService.show(generico);
    setTimeout(this.modalRef.hide, 4000);
  }

  openModalNotFound(generico: TemplateRef<any>) {
    this.modalRef = this.modalService.show(generico);
  }
}
