import { Component, OnInit } from '@angular/core';
import { ColegioService } from '../../../services/domain/colegio.service';

@Component({
  selector: 'app-list-colegios',
  templateUrl: './list-colegios.component.html',
  styleUrls: ['./list-colegios.component.css']
})
export class ListColegiosComponent implements OnInit {

  constructor(
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    console.log("message");
    this.colegioService.findAll()
      .subscribe( response => {  
        console.log();
      },
    error => {
      console.log(error);
    });
  }

}
