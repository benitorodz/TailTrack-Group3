import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedingService, Feeding } from './feeding.service';

@Component({
  selector: 'app-feeding-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feeding-schedule.component.html',
  styleUrls: ['./feeding-schedule.component.css']
})
export class FeedingScheduleComponent implements OnInit {
  feedingForm: FormGroup;
  feedings: Feeding[] = [];
  editingIndex: number | null = null;
  petId = 'demo-pet-1';

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private feedingApi: FeedingService
  ) {
    this.feedingForm = this.fb.group({
      petName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      foodType: ['', Validators.required],
      portion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFeedings();
  }

  private loadFeedings(): void {
    this.loading = true;
    this.errorMsg = '';
    this.feedingApi.list(this.petId).subscribe({
      next: data => {
        this.feedings = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error loading feedings.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.feedingForm.invalid) {
      this.feedingForm.markAllAsTouched();
      return;
    }

    const formValue = this.feedingForm.value;
    const payload: Feeding = {
      ...formValue,
      petId: this.petId
    };

    this.errorMsg = '';
    this.successMsg = '';

    if (this.editingIndex !== null) {
      const current = this.feedings[this.editingIndex];
      if (!current._id) {
        this.errorMsg = 'Cannot edit record without an id.';
        return;
      }

      this.feedingApi.update(current._id, payload).subscribe({
        next: updated => {
          this.feedings[this.editingIndex!] = updated;
          this.editingIndex = null;
          this.successMsg = 'Feeding updated.';
          this.feedingForm.reset();
        },
        error: () => {
          this.errorMsg = 'Error updating feeding.';
        }
      });
    } else {
      this.feedingApi.create(payload).subscribe({
        next: created => {
          this.feedings.unshift(created);
          this.successMsg = 'Feeding added.';
          this.feedingForm.reset();
        },
        error: () => {
          this.errorMsg = 'Error adding feeding.';
        }
      });
    }
  }

  onEdit(index: number): void {
    const record = this.feedings[index];
    this.feedingForm.patchValue({
      petName: record.petName,
      date: record.date,
      time: record.time,
      foodType: record.foodType,
      portion: record.portion
    });
    this.editingIndex = index;
    this.successMsg = '';
    this.errorMsg = '';
  }

  onDelete(index: number): void {
    const feeding = this.feedings[index];
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the feeding entry for ${feeding.petName}?`
    );

    if (!confirmDelete || !feeding._id) {
      return;
    }

    this.errorMsg = '';
    this.successMsg = '';

    this.feedingApi.delete(feeding._id).subscribe({
      next: () => {
        this.feedings.splice(index, 1);
        if (this.editingIndex === index) {
          this.editingIndex = null;
          this.feedingForm.reset();
        }
        this.successMsg = 'Feeding deleted.';
      },
      error: () => {
        this.errorMsg = 'Error deleting feeding.';
      }
    });
  }
}
