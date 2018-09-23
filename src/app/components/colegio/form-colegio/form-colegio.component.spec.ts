import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormColegioComponent } from './form-colegio.component';

describe('FormColegioComponent', () => {
  let component: FormColegioComponent;
  let fixture: ComponentFixture<FormColegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormColegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
