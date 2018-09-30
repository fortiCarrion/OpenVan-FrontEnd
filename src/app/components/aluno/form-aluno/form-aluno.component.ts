import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { VeiculoService } from '../../../services/domain/veiculo.service';
import { VeiculoDTO } from '../../../models/veiculo.dto';
import { ColegioDTO } from '../../../models/colegio.dto';
import { ColegioService } from '../../../services/domain/colegio.service';
import { AlunoDTO, Endereco } from '../../../models/aluno.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-aluno',
  templateUrl: './form-aluno.component.html',
  styleUrls: ['./form-aluno.component.css']
})
export class FormAlunoComponent implements OnInit {

  formGroup: FormGroup;

  title = 'Cadastrar Aluno';

  periodos: string[] = ['Matutino', 'Vespertino', 'Noturno'];
  status: string[] = ['Ativo', 'Inativo'];
  vencimento_pagamentos: number[] = [5, 10, 15, 20, 25];
  numero_veiculo: number[];
  http: any;

  veiculos: VeiculoDTO[];
  colegios: ColegioDTO[];

  veiculo_numero: any[];

  today = new Date();

  //veiculo = new Veiculo(1, 1, 'Mercurio', 'status[0]', 2016, 'Renault h5', 'Nenhum recado existente', null);
  //veiculo_blank = new Veiculo(null, null, '', '', null, '', '', null);
  //colegio = new Colegio(1, 'londrinense', 'Av. Duque de Caxias', 1589, '(43) 3372-5555', 'http://www.colegiomaxi.com.br/', 'teste');
  //colegio_blank = new Colegio(null, '', '', null, '', '', '');
  // tslint:disable-next-line:max-line-length
  //model: Aluno = new Aluno(1, this.veiculo, this.colegio, 'ruan', 'arauto', 'vanessa', null, null, this.periodo[1], null, '43 0000-0000', null, 'ativo', 'nenhum recado');
  //model_blank = new Aluno(-1, this.veiculo_blank, this.colegio_blank, '', '', '', [], [], '', null, '', null, '', '');
  aluno_em_criacao: AlunoDTO;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,

    public veiculoService: VeiculoService,
    public colegioService: ColegioService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      pai: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      mae: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      periodo: ['', [Validators.required]],
      celular: ['', [Validators.minLength(8), Validators.maxLength(14)]],
      status: new FormControl (this.status[0], Validators.required),
      recado: ['', [Validators.maxLength(150)]],
      valor: ['', [Validators.min(2)]],
      vencimento: ['', [Validators.max(2)]],
      colegio: ['', Validators.required],
      veiculo: ['', [Validators.required]],
      enderecos: ['']
    });
    //this.aluno_em_criacao = this.model_blank;
    //console.log(this.aluno_em_criacao);
  }

  ngOnInit() {
    this.getVeiculos();
    this.getColegios();
    // Na hora da implementação verificar a linha de baixo
    //this.model = this.model_blank;
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
  addEnderecoPressed(): void {
    console.log('enderecos pressed');
    if (!this.aluno_em_criacao.enderecos) {
      this.aluno_em_criacao.enderecos = [{ id: null, endereco: null, numero: null, bairro: null, complemento: null }];
    } else {
      this.aluno_em_criacao.enderecos.push({ id: null, endereco: null, numero: null, bairro: null, complemento: null });
    }
  }

  removeEnderecoIndex(index): void {
    this.aluno_em_criacao.enderecos.splice(index, 1);
  }

  addContatoPressed(): void {
    console.log('contatos pressed');
    if (!this.aluno_em_criacao.contatos) {
      this.aluno_em_criacao.contatos = [{ id: null, referencia: null, celular: null, residencial: null, comercial: null }];
    } else {
      this.aluno_em_criacao.contatos.push({ id: null, referencia: null, celular: null, residencial: null, comercial: null });
    }
  }

  removeContatoIndex(index): void {
    this.aluno_em_criacao.contatos.splice(index, 1);
  }


  goBack(): void {
    this.location.back();
  }
}
