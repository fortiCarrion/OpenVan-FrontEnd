import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVeiculosComponent } from './form-veiculos.component';

describe('FormVeiculosComponent', () => {
  let component: FormVeiculosComponent;
  let fixture: ComponentFixture<FormVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
