import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVeiculoComponent } from './edit-veiculo.component';

describe('EditVeiculoComponent', () => {
  let component: EditVeiculoComponent;
  let fixture: ComponentFixture<EditVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
