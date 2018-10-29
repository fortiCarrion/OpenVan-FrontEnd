import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { VeiculoService } from '../../../services/domain/veiculo.service';
import { VeiculoDTO } from '../../../models/veiculo.dto';
import { ColegioDTO } from '../../../models/colegio.dto';
import { ColegioService } from '../../../services/domain/colegio.service';
import { AlunoDTO, Endereco } from '../../../models/aluno.dto';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { AlunoService } from '../../../services/domain/aluno.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-form-aluno',
  templateUrl: './form-aluno.component.html',
  styleUrls: ['./form-aluno.component.css']
})
export class FormAlunoComponent implements OnInit {

  data = {
    enderecos: [
      {
        endereco: "",
        numero: "",
        bairro: "",
        complemento: ""
      }
    ],

    contatos: [
      {
        referencia: "",
        celular: "",
        comercial: "",
        residencial: ""
      }
    ],
  }

  formGroup: FormGroup;
  modalRef: BsModalRef;


  modal_success: TemplateRef<any>;
  modal_error: TemplateRef<any>;

  error_message: string;

  title = 'Cadastrar Aluno';
  error = 'Não padronizado';

  periodos: string[] = ['Matutino', 'Vespertino', 'Noturno'];
  //status: string[] = ['Ativo', 'Inativo'];
  vencimento_pagamentos: number[] = [5, 10, 15, 20, 25];
  numero_veiculo: number[];
  http: any;

  veiculos: VeiculoDTO[];
  colegios: ColegioDTO[];

  veiculo_numero: any[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,

    public veiculoService: VeiculoService,
    public colegioService: ColegioService,
    public alunoService: AlunoService,
    private modalService: BsModalService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      pai: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      mae: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      periodo: ['', [Validators.required]],
      celular: ['', [Validators.minLength(8), Validators.maxLength(14)]],
      status: [0, [Validators.required]],
      recado: ['', [Validators.maxLength(150)]],
      valor: ['', [Validators.minLength(5)]],
      vencimentoMensalidade: ['', [Validators.required]],
      colegio: this.formBuilder.group({
        id: [null, [Validators.required]],
      }),
      veiculo: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      enderecos: this.formBuilder.array([
    
      ]),
      contatos: this.formBuilder.array([

      ]),
    });

  }

  ngOnInit() {
    this.getVeiculos();
    this.getColegios();

    //this.setEnderecos();
    //this.setContatos();
  }

  onSubmit() {
    this.toNumPeriodo(this.formGroup.controls['periodo'].value);
    this.toNumDiaVencimento(this.formGroup.controls['vencimentoMensalidade'].value);
    this.toNumColegio();
    this.toNumVeiculo();
    //this.formGroup.controls['colegio'].setValue(this.colegio_id);
    //this.toNumColegio();

    this.insert();
  }

  getVeiculos(): void {
    this.veiculoService.findAll()
      .subscribe(response => {
        this.veiculos = response;
      },
        error => {
          console.log(error);
        });
  }

  getColegios(): void {
    this.colegioService.findAll()
      .subscribe(response => {
        this.colegios = response;
      },
        error => {
          console.log(error);
        });
  }

  goBack(): void {
    this.location.back();
  }

  toNumColegio() {
    let colegio_id = this.formGroup.value.colegio.id;

    let control = <FormGroup>this.formGroup.controls.colegio;
    control.controls['id'].setValue(parseInt(colegio_id));
  }

  toNumVeiculo() {
    let veiculo_id = this.formGroup.value.veiculo.id;

    let control = <FormGroup>this.formGroup.controls.veiculo;
    control.controls['id'].setValue(parseInt(veiculo_id));
  }

  toNumPeriodo(periodo: string) {

    if (periodo == "Matutino") {
      this.formGroup.patchValue({ "periodo": 0 });
    } else if (periodo == "Vespertino") {
      this.formGroup.patchValue({ "periodo": 1 });
    } else {
      this.formGroup.patchValue({ "periodo": 2 });
    }
  }

  toNumDiaVencimento(dia: string) {

    switch (dia) {
      case "5": {
        this.formGroup.patchValue({ "vencimentoMensalidade": 5 });
        break;
      }
      case "10": {
        this.formGroup.patchValue({ "vencimentoMensalidade": 10 });
        break;
      }
      case "15": {
        this.formGroup.patchValue({ "vencimentoMensalidade": 15 });
        break;
      }
      case "20": {
        this.formGroup.patchValue({ "vencimentoMensalidade": 20 });
        break;
      }
      case "25": {
        this.formGroup.patchValue({ "vencimentoMensalidade": 25 });
        break;
      }
    }
  }

  insert() {
    console.log(this.formGroup.value);
    this.alunoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.goBack();
        this.openModal(this.modal_success);
      },

        error => {
          this.openModal(this.modal_error);
          switch (error.status) {

            default:

              this.error_message = error.message;
          }
        });
  }

  openModal(inserido: TemplateRef<any>) {
    this.modalRef = this.modalService.show(inserido);
    setTimeout(this.modalRef.hide, 4000);
  }

  // -----------------------------------------------------
  // ENDERECOS

  addNewEndereco() {
    let control = <FormArray>this.formGroup.controls.enderecos;
    control.push(
      this.formBuilder.group({
        endereco: [''],
        numero: [''],
        bairro: [''],
        complemento: ['']
      })
    )
  }

  setEnderecos() {
    let control = <FormArray>this.formGroup.controls.enderecos;
    this.data.enderecos.forEach(x => {
      control.push(this.formBuilder.group({
        endereco: x.endereco,
        numero: x.numero,
        bairro: x.bairro,
        complemento: x.complemento
      }))
    })
  }

  deleteEndereco(index) {
    let control = <FormArray>this.formGroup.controls.enderecos;
    control.removeAt(index)
  }


  // -----------------------------------------------------
  // ENDERECOS
  addNewContato() {
    let control = <FormArray>this.formGroup.controls.contatos;
    control.push(
      this.formBuilder.group({
        referencia: [''],
        celular: [''],
        residencial: [''],
        comercial: ['']
      })
    )
  }

  setContatos() {
    let control = <FormArray>this.formGroup.controls.contatos;
    this.data.contatos.forEach(x => {
      control.push(this.formBuilder.group({
        referencia: x.referencia,
        celular: x.celular,
        residencial: x.residencial,
        comercial: x.comercial
      }))
    })
  }

  deleteContato(index) {
    let control = <FormArray>this.formGroup.controls.contatos;
    control.removeAt(index)
  }

}
