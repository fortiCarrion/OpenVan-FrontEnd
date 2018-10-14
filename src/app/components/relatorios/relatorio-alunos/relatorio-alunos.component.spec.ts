import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAlunosComponent } from './relatorio-alunos.component';

describe('RelatorioAlunosComponent', () => {
  let component: RelatorioAlunosComponent;
  let fixture: ComponentFixture<RelatorioAlunosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAlunosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
