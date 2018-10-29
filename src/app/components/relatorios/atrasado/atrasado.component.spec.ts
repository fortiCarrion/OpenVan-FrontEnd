import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrasadoComponent } from './atrasado.component';

describe('AtrasadoComponent', () => {
  let component: AtrasadoComponent;
  let fixture: ComponentFixture<AtrasadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrasadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrasadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
