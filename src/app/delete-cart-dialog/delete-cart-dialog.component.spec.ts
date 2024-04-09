import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCartDialogComponent } from './delete-cart-dialog.component';

describe('DeleteCartDialogComponent', () => {
  let component: DeleteCartDialogComponent;
  let fixture: ComponentFixture<DeleteCartDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCartDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
