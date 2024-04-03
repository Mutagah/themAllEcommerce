import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserDialogComponent } from './single-user-dialog.component';

describe('SingleUserDialogComponent', () => {
  let component: SingleUserDialogComponent;
  let fixture: ComponentFixture<SingleUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleUserDialogComponent]
    });
    fixture = TestBed.createComponent(SingleUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
