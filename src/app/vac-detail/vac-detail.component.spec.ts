import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacDetailComponent } from './vac-detail.component';

describe('VacDetailComponent', () => {
  let component: VacDetailComponent;
  let fixture: ComponentFixture<VacDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
