import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAbonneComponent } from './single-abonne.component';

describe('SingleAbonneComponent', () => {
  let component: SingleAbonneComponent;
  let fixture: ComponentFixture<SingleAbonneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAbonneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
