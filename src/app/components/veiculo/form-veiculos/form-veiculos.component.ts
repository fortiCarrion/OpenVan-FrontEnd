import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VeiculoService } from '../../../services/domain/veiculo.service';

@Component({
  selector: 'app-form-veiculos',
  templateUrl: './form-veiculos.component.html',
  styleUrls: ['./form-veiculos.component.css']
})
export class FormVeiculosComponent implements OnInit {

  formGroup: FormGroup;

  title = 'Cadastrar Veículo';

  status = ['Ativo', 'Inativo', 'Manutenção'];
  http: any;

  constructor(
    private location: Location,
    private colegioService: VeiculoService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
    status: ['', [Validators.required]],
    condutor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
    modelo: ['', [Validators.maxLength(50)]],
    ano: ['', [Validators.minLength(4), Validators.maxLength(4)]],
    recado: ['', [Validators.maxLength(150)]]
  }); }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
