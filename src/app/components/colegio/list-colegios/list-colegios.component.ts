import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColegioService } from '../../../services/domain/colegio.service';
import { ColegioDTO } from '../../../models/colegio.dto';

import { DataSource } from '@angular/cdk/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { error } from 'util';

@Component({
  selector: 'app-list-colegios',
  templateUrl: './list-colegios.component.html',
  styleUrls: ['./list-colegios.component.css']
})
export class ListColegiosComponent implements OnInit {


  public array: any;
  //public displayedColumns = ['', '', '', '', ''];

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  title: String = 'Colégios';

  colegios: ColegioDTO[];
  selectedColegio: ColegioDTO;
  modalRef: BsModalRef;

  displayedColumns: string[] = ['nome', 'endereco', 'numero', 'telefone', 'opcoes'];


  constructor(
    public colegioService: ColegioService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getArray();
    this.getColegios();
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
    this.getColegios();
  }

  private getArray() {
    this.colegioService.findAll()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<ColegioDTO>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }


  getColegios(): void {
    this.colegioService.findAll()
      .subscribe(response => {
        this.colegios = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteColegio(id: string) {
    this.colegioService.delete(id)
    .subscribe(response =>{
      this.getColegios();
    }, error => {
      console.log(error);
    });
    
  }
}
