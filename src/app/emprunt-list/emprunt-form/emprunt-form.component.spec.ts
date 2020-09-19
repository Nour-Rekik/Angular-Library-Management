import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntFormComponent } from './emprunt-form.component';

describe('EmpruntFormComponent', () => {
  let component: EmpruntFormComponent;
  let fixture: ComponentFixture<EmpruntFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpruntFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
