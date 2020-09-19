import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonneListComponent } from './abonne-list.component';

describe('AbonneListComponent', () => {
  let component: AbonneListComponent;
  let fixture: ComponentFixture<AbonneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
