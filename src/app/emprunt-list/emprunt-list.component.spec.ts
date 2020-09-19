import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntListComponent } from './emprunt-list.component';

describe('EmpruntListComponent', () => {
  let component: EmpruntListComponent;
  let fixture: ComponentFixture<EmpruntListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpruntListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
