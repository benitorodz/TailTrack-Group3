import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feeding-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feeding-schedule.component.html',
  styleUrls: ['./feeding-schedule.component.css']
})
export class FeedingScheduleComponent {
  feedingForm: FormGroup;
  feedings: any[] = [];
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.feedingForm = this.fb.group({
      petName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      foodType: ['', Validators.required],
      portion: ['', Validators.required]
    });

    const saved = localStorage.getItem('feedings');
    if (saved) {
      this.feedings = JSON.parse(saved);
    }
  }

  onSubmit(): void {
    if (this.feedingForm.invalid) {
      this.feedingForm.markAllAsTouched();
      return;
    }

    const formValue = this.feedingForm.value;

    if (this.editingIndex !== null) {
      this.feedings[this.editingIndex] = formValue;
      this.editingIndex = null;
    } else {
      this.feedings.push(formValue);
    }

    localStorage.setItem('feedings', JSON.stringify(this.feedings));
    this.feedingForm.reset();
  }

  onEdit(index: number): void {
    const record = this.feedings[index];
    this.feedingForm.patchValue(record);
    this.editingIndex = index;
  }

  onDelete(index: number): void {
  const feeding = this.feedings[index];
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the feeding entry for ${feeding.petName}?`
  );

  if (confirmDelete) {
    this.feedings.splice(index, 1);
    localStorage.setItem('feedings', JSON.stringify(this.feedings));

    if (this.editingIndex === index) {
      this.editingIndex = null;
      this.feedingForm.reset();
    }
  }
} 

}