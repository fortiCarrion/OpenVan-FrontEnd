import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualMensalidadeComponent } from './manual-mensalidade.component';

describe('ManualMensalidadeComponent', () => {
  let component: ManualMensalidadeComponent;
  let fixture: ComponentFixture<ManualMensalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualMensalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualMensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
