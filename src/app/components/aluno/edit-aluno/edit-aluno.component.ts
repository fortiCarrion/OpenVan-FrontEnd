import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { VeiculoDTO } from '../../../models/veiculo.dto';
import { ColegioDTO } from '../../../models/colegio.dto';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { VeiculoService } from '../../../services/domain/veiculo.service';
import { ColegioService } from '../../../services/domain/colegio.service';
import { AlunoService } from '../../../services/domain/aluno.service';
import { AlunoDTO } from '../../../models/aluno.dto';

@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.css']
})
export class EditAlunoComponent implements OnInit {

  data = {
    enderecos: [
      {
        id: "",
        endereco: "",
        numero: "",
        bairro: "",
        complemento: ""
      }
    ],

    contatos: [
      {
        id: "",
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

  title = '';
  error = 'Não padronizado';

  // periodos: string[] = ['Matutino', 'Vespertino', 'Noturno'];
  periodos: string[] = ['MATUTINO', 'VERSPERTINO', 'NOTURNO'];
  vencimento_pagamentos: number[] = [5, 10, 15, 20, 25];
  numero_veiculo: number[];
  http: any;

  veiculos: VeiculoDTO[];
  colegios: ColegioDTO[];
  aluno: AlunoDTO;

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
      status: [null, [Validators.required]],
      recado: ['', [Validators.maxLength(150)]],
      valor: ['', [Validators.min(0), Validators.max(999)]],
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
    this.getAluno();
  }

  onSubmit(): void {
    //this.toNumRede(this.formGroup.controls['rede'].value);
    this.update();
    console.log(this.formGroup.value);
  }

  update() {
    //console.log(this.formGroup.value);
    this.alunoService.update(this.formGroup.value, this.aluno.id)
      .subscribe(response => {
        this.goBack();
        this.openModal(this.modal_success);
      },

        error => {
          console.log(error);
          this.openModal(this.modal_error);
          switch (error.status) {

            case 400:

              this.error_message = error;
              break;

            default:

              this.error_message = error.message;
          }

        });
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

  getAluno(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.alunoService.findOne(id)
      .subscribe(response => {
        this.aluno = response;
        this.title = 'Atualizar Aluno: ' + this.aluno.nome;
        // console.log(response.vencimentoMensalidade);
        // console.log('test');

        this.formGroup.patchValue({ "nome": this.aluno.nome });
        this.formGroup.patchValue({ "pai": this.aluno.pai });
        this.formGroup.patchValue({ "mae": this.aluno.mae });
        this.formGroup.patchValue({ "periodo": this.aluno.periodo });
        this.formGroup.patchValue({ "celular": this.aluno.celular });
        this.formGroup.patchValue({ "status": this.aluno.status });
        this.formGroup.patchValue({ "recado": this.aluno.recado });
        this.formGroup.patchValue({ "valor": this.aluno.valor });
        this.formGroup.patchValue({ "vencimentoMensalidade": this.aluno.vencimentoMensalidade });

        let veiculoId = response.veiculo.id;
        let controlVeiculo = <FormGroup>this.formGroup.controls.veiculo;
        controlVeiculo.controls['id'].patchValue(parseInt(veiculoId));

        // this.formGroup.controls['id'].patchValue(veiculo_id);

        let colegioId = response.colegio.id;
        let controlColegio = <FormGroup>this.formGroup.controls.colegio;
        controlColegio.controls['id'].setValue(parseInt(colegioId));

        let controlEnderecos = <FormArray>this.formGroup.controls.enderecos;
        // console.log(controlEnderecos);
        // console.log(response.enderecos);
        response.enderecos.forEach(x => {

          controlEnderecos.push(this.formBuilder.group({
            id: x.id,
            endereco: x.endereco,
            numero: x.numero,
            bairro: x.bairro,
            complemento: x.complemento
          }))
        });

        let controlContatos = <FormArray>this.formGroup.controls.contatos;
        // console.log(controlContatos);
        // console.log(response.contatos);
        response.contatos.forEach(x => {

          controlContatos.push(this.formBuilder.group({
            id: x.id,
            referencia: x.referencia,
            residencial: x.residencial,
            celular: x.celular,
            comercial: x.comercial
          }))
        });

        //console.log(this.formGroup.value);
      },
        error => {
          console.log(error);
          this.openModalNotFound(this.modal_error);

          this.error_message = error.msg;

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

    if (periodo == "MATUTINO") {
      this.formGroup.patchValue({ "periodo": 0 });
    } else if (periodo == "VESPERTINO") {
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
  // CONTATOS
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

  openModalNotFound(generico: TemplateRef<any>) {
    this.modalRef = this.modalService.show(generico);
  }

}
