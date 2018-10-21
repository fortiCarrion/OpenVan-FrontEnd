import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MensalidadeDTO } from '../../models/mensalidade.dto';
import { MensalidadeService } from '../../services/domain/mensalidade.service';
import { MatSort, MatSortable, MatTableDataSource, PageEvent, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {DateFormatPipe} from '../../date-format/date-format';
import { error } from 'util';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mensalidade',
  templateUrl: './mensalidade.component.html',
  styleUrls: ['./mensalidade.component.css']
})
export class MensalidadeComponent implements OnInit {

  public array: any;

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  title = 'Mensalidades';
  aguardandoPagamento = 'AGUARDANDO PAGAMENTO';
  formGroup: FormGroup;
  selectedMensalidade: MensalidadeDTO;
  modalRef: BsModalRef;

  mensalidades: MensalidadeDTO[];

  //displayedColumns: string[] = ['aluno', 'emissao', 'status','vencimento', 'visualizar', 'confirmar pagamento'];
  displayedColumns: string[] = ['veiculo', 'aluno', 'emissao', 'status','vencimento', 'visualizar', 'opcoes'];


  constructor(
    public mensalidadeService: MensalidadeService,
    private modalService: BsModalService,
    public formBuilder: FormBuilder
  ) { 
    this.formGroup = this.formBuilder.group({
      status: [1]
    })
  }

  ngOnInit() {
    this.getArray();
    this.getMensalidades();
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
    this.getMensalidades();
  }
  
  // Tratamento para uso da tabela com filtros
  private getArray() {
    this.mensalidadeService.findAll()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<MensalidadeDTO>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  getMensalidades(): void {
    this.mensalidadeService.findAll()
      .subscribe(response => {
        this.mensalidades = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
      },
        error => {
          console.log(error);
        });
  }

  updateMensalidadePaga(id){
    console.log(this.formGroup.value);
    this.mensalidadeService.updateMensadalidadePaga(this.formGroup.value, id)
    .subscribe(response => {
      console.log('S');
      this.getMensalidades();;
    }, error => {
      console.log('N');
    });
    //console.log(this.mensalidadeService.updateMensadalidadePaga(id)); 
   }

  onSelect(mensalidade: MensalidadeDTO): void {
    this.selectedMensalidade = mensalidade;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
