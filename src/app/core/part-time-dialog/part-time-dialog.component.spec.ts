import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTimeDialogComponent } from './part-time-dialog.component';

describe('PartTimeDialogComponent', () => {
  let component: PartTimeDialogComponent;
  let fixture: ComponentFixture<PartTimeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartTimeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
