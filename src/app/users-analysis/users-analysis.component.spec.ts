import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAnalysisComponent } from './users-analysis.component';

describe('UsersAnalysisComponent', () => {
  let component: UsersAnalysisComponent;
  let fixture: ComponentFixture<UsersAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAnalysisComponent]
    });
    fixture = TestBed.createComponent(UsersAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
