import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveModelComponent } from './solve-model.component';

describe('SolveModelComponent', () => {
  let component: SolveModelComponent;
  let fixture: ComponentFixture<SolveModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolveModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolveModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
