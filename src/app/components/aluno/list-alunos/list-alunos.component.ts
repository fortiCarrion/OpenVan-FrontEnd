import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AlunoDTO } from '../../../models/aluno.dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlunoService } from '../../../services/domain/aluno.service';

@Component({
  selector: 'app-list-alunos',
  templateUrl: './list-alunos.component.html',
  styleUrls: ['./list-alunos.component.css']
})
export class ListAlunosComponent implements OnInit {

  public array: any;

  // paginator configuration
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  title: String = 'Alunos';


  alunos: AlunoDTO[];
  selectedAluno: AlunoDTO;
  modalRef: BsModalRef;

  displayedColumns: string[] = ['nome', 'valor', 'vencimento', 'status', 'outros', 'rematricula'];

  constructor(
    public alunoService: AlunoService,
    private modalService: BsModalService) {

  }

  ngOnInit() {
    this.getArray();
    this.getalunos();

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
    this.getalunos();
  }
  
  private getArray() {
    this.alunoService.findAll()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<AlunoDTO>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  getalunos(): void {
    this.alunoService.findAll()
      .subscribe(response => {
        this.alunos = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        error => {
          console.log(error);
        });
  }

  onSelect(aluno: AlunoDTO): void {
    this.selectedAluno = aluno;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
