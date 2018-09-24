import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource, PageEvent, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { VeiculoDTO } from '../../../models/veiculo.dto';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { VeiculoService } from '../../../services/domain/veiculo.service';


@Component({
  selector: 'app-list-veiculos',
  templateUrl: './list-veiculos.component.html',
  styleUrls: ['./list-veiculos.component.css']
})
export class ListVeiculosComponent implements OnInit {

  public array: any;
  //public displayedColumns = ['', '', '', '', ''];

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  title: String = 'Veículos';


  veiculos: VeiculoDTO[];
  selectedVeiculo: VeiculoDTO;
  modalRef: BsModalRef;

  displayedColumns: string[] = ['numero', 'condutor', 'modelo', 'status', 'outros'];

  constructor(
    public veiculoService: VeiculoService,
    private modalService: BsModalService) {

  }

  ngOnInit() {
    this.getArray();
    this.getVeiculos();

  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
  
  private getArray() {
    this.veiculoService.findAll()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<VeiculoDTO>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  getVeiculos(): void {
    this.veiculoService.findAll()
      .subscribe(response => {
        this.veiculos = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
