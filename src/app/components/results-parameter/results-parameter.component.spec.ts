import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsParameterComponent } from './results-parameter.component';

describe('ResultsParameterComponent', () => {
  let component: ResultsParameterComponent;
  let fixture: ComponentFixture<ResultsParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsParameterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
