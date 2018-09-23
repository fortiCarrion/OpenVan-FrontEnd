import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVeiculosComponent } from './list-veiculos.component';

describe('ListVeiculosComponent', () => {
  let component: ListVeiculosComponent;
  let fixture: ComponentFixture<ListVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
