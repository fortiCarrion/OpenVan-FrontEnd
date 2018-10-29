import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitadoComponent } from './quitado.component';

describe('QuitadoComponent', () => {
  let component: QuitadoComponent;
  let fixture: ComponentFixture<QuitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
