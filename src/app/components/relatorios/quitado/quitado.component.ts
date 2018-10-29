import { Component, OnInit } from '@angular/core';
import { MensalidadeDTO } from '../../../models/mensalidade.dto';
import { MensalidadeService } from '../../../services/domain/mensalidade.service';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quitado',
  templateUrl: './quitado.component.html',
  styleUrls: ['./quitado.component.css']
})
export class QuitadoComponent implements OnInit {


  tipo_relatorio: String = 'Quitado';
  cabecalho: String = 'Relatório Analítico de Mensalidades ' + this.tipo_relatorio;
  nome_fantasia: String = 'Doroso e Oliveira Transportes';

  mensalidades: MensalidadeDTO[];

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
    public mensalidadeService: MensalidadeService
  ) { }

  ngOnInit() {
    this.today = this.formatDate(new Date);
    this.getMensalidadesByStatus(2);
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
      pdf.save('mensalidadesQuitado.pdf'); // Generated PDF   
    });
  }


  getMensalidadesByStatus(status: number): void {
    this.mensalidadeService.findAllByStatus(status)
      .subscribe(response => {
        this.mensalidades = response;
      },
        error => {
          console.log(error);
        });
  }
}
