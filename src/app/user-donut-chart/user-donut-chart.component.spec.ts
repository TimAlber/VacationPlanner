import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDonutChartComponent } from './user-donut-chart.component';

describe('UserDonutChartComponent', () => {
  let component: UserDonutChartComponent;
  let fixture: ComponentFixture<UserDonutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDonutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
