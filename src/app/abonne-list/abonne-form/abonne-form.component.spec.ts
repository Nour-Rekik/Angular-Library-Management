import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonneFormComponent } from './abonne-form.component';

describe('AbonneFormComponent', () => {
  let component: AbonneFormComponent;
  let fixture: ComponentFixture<AbonneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonneFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
