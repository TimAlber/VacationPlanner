import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitelmentDialogComponent } from './entitelment-dialog.component';

describe('EntitelmentDialogComponent', () => {
  let component: EntitelmentDialogComponent;
  let fixture: ComponentFixture<EntitelmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitelmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitelmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
