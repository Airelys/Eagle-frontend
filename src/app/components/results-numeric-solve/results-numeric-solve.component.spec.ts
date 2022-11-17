import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsNumericSolveComponent } from './results-numeric-solve.component';

describe('ResultsNumericSolveComponent', () => {
  let component: ResultsNumericSolveComponent;
  let fixture: ComponentFixture<ResultsNumericSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsNumericSolveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsNumericSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
