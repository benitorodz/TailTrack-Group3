// feeding-schedule.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedingScheduleComponent } from './feeding-schedule.component';
import { By } from '@angular/platform-browser';

describe('FeedingScheduleComponent', () => {
  let component: FeedingScheduleComponent;
  let fixture: ComponentFixture<FeedingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedingScheduleComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.feedingForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.feedingForm;
    form.patchValue({
      petName: 'Luna',
      date: '2025-10-22',
      time: '08:30',
      foodType: 'Dry Food',
      portion: '1 cup'
    });
    expect(form.valid).toBeTrue();
  });

  it('should add a feeding entry when form is submitted', () => {
    component.feedingForm.setValue({
      petName: 'Luna',
      date: '2025-10-22',
      time: '08:30',
      foodType: 'Dry Food',
      portion: '1 cup'
    });
    component.onSubmit();
    expect(component.feedings.length).toBe(1);
  });
});
