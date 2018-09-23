import { Component, OnInit, TemplateRef } from '@angular/core';
import { ColegioService } from '../../../services/domain/colegio.service';
import { ColegioDTO } from '../../../models/colegio.dto';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-list-colegios',
  templateUrl: './list-colegios.component.html',
  styleUrls: ['./list-colegios.component.css']
})
export class ListColegiosComponent implements OnInit {

  title: String = 'Colégios';

  colegios: ColegioDTO[];
  selectedColegio: ColegioDTO;
  modalRef: BsModalRef;

  constructor(
    public colegioService: ColegioService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getColegios();
  }

  getColegios(): void {
    this.colegioService.findAll()
      .subscribe( response => {
        this.colegios = response;
      },
    error => {
      console.log(error);
    });
  }

  onSelect(colegio: ColegioDTO): void {
    this.selectedColegio = colegio;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
