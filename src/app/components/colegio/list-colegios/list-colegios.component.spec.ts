import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColegiosComponent } from './list-colegios.component';

describe('ListColegiosComponent', () => {
  let component: ListColegiosComponent;
  let fixture: ComponentFixture<ListColegiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListColegiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
