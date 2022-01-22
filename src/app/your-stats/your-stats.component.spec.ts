import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourStatsComponent } from './your-stats.component';

describe('YourStatsComponent', () => {
  let component: YourStatsComponent;
  let fixture: ComponentFixture<YourStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
