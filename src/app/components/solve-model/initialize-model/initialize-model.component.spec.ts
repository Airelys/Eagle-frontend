import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializeModelComponent } from './initialize-model.component';

describe('InitializeModelComponent', () => {
  let component: InitializeModelComponent;
  let fixture: ComponentFixture<InitializeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitializeModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitializeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
