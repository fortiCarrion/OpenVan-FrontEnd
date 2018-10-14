import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioCabecalhoComponent } from './relatorio-cabecalho.component';

describe('RelatorioCabecalhoComponent', () => {
  let component: RelatorioCabecalhoComponent;
  let fixture: ComponentFixture<RelatorioCabecalhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioCabecalhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioCabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
