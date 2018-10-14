import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { AlunoDTO } from '../../../models/aluno.dto';
import { AlunoService } from '../../../services/domain/aluno.service';

@Component({
  selector: 'app-relatorio-alunos',
  templateUrl: './relatorio-alunos.component.html',
  styleUrls: ['./relatorio-alunos.component.css']
})
export class RelatorioAlunosComponent implements OnInit {

  tipo_relatorio: String = 'Alunos';
  cabecalho: String = 'Relatório Analítico de Registro ' + this.tipo_relatorio;
  nome_fantasia: String = 'Doroso e Oliveira Transportes';

  alunos: AlunoDTO[];
  today: String;

  formatDate(today) {
    var monthNames = [
      "Janeiro", "Fevereiro", "Março",
      "Abril", "Maio", "Junho", "Julho",
      "Agosto", "Setembro", "Outubro",
      "Novembro", "Dezembro"
    ];

    var day = today.getDate();
    var monthIndex = today.getMonth();
    var year = today.getFullYear();
    var hour = today.getHours();
    var minute = today.getMinutes();

    if (hour < 9) {
      hour = '0' + hour;
    }

    if (minute < 9) {
      minute = '0' + minute;
    }

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minute;
  }

  constructor(
    public alunoService: AlunoService
  ) { }

  ngOnInit() {
    this.today = this.formatDate(new Date);
    this.getalunos();

  }

  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  getalunos(): void {
    this.alunoService.findAll()
      .subscribe(response => {
        this.alunos = response;
      },
        error => {
          console.log(error);
        });
  }


}
