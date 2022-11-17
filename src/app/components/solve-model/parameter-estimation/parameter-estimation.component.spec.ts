import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterEstimationComponent } from './parameter-estimation.component';

describe('ParameterEstimationComponent', () => {
  let component: ParameterEstimationComponent;
  let fixture: ComponentFixture<ParameterEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterEstimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
