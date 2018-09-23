import { Component, OnInit, TemplateRef } from '@angular/core';
import { VeiculoDTO } from '../../../models/veiculo.dto';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { VeiculoService } from '../../../services/domain/veiculo.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-list-veiculos',
  templateUrl: './list-veiculos.component.html',
  styleUrls: ['./list-veiculos.component.css']
})
export class ListVeiculosComponent implements OnInit {

  title: String = 'Veículos';

  veiculos: VeiculoDTO[];
  selectedVeiculo: VeiculoDTO;
  modalRef: BsModalRef;


  constructor(
    public veiculoService: VeiculoService,
    private modalService: BsModalService) {

  }

  ngOnInit() {

    $(document).ready(function () {
      $("#btn1").click(function () {
        alert("clikced");
      })
    })

    this.getVeiculos();
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

  onSelect(veiculo: VeiculoDTO): void {
    this.selectedVeiculo = veiculo;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
