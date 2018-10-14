import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioColegiosComponent } from './relatorio-colegios.component';

describe('RelatorioColegiosComponent', () => {
  let component: RelatorioColegiosComponent;
  let fixture: ComponentFixture<RelatorioColegiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioColegiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioColegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
