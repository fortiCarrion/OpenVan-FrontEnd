import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVeiculosComponent } from './relatorio-veiculos.component';

describe('RelatorioVeiculosComponent', () => {
  let component: RelatorioVeiculosComponent;
  let fixture: ComponentFixture<RelatorioVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
