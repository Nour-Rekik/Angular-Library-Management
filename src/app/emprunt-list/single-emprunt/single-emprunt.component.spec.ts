import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmpruntComponent } from './single-emprunt.component';

describe('SingleEmpruntComponent', () => {
  let component: SingleEmpruntComponent;
  let fixture: ComponentFixture<SingleEmpruntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEmpruntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
