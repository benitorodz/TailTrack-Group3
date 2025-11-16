import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Exercise, ExerciseService } from './exercise.service';

@Component({
  selector: 'app-exercise-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercise-log.component.html',
  styleUrls: ['./exercise-log.component.css']
})
export class ExerciseLogComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ExerciseService) {}

  petId = 'demo-pet-1';

  activities: Exercise['activityType'][] = [
    'Walk', 'Run', 'Play', 'Park', 'Frisbee', 'Swim', 'Hike', 'Training', 'Other'
  ];

  items: Exercise[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';
  isEditing = false;
  editingId: string | null = null;

  form!: FormGroup;

  ngOnInit(): void {
    // build the form here to avoid TS2729
    this.form = this.fb.group({
      dateTime: [this.nowIsoShort(), Validators.required],
      activityType: ['Walk', Validators.required],
      durationMinutes: [30, [Validators.required, Validators.min(1)]],
      distance: [0, [Validators.min(0)]],
      notes: ['']
    });

    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.errorMsg = '';
    this.api.list(this.petId).subscribe({
      next: data => { this.items = data; this.loading = false; },
      error: err => { this.errorMsg = err?.message || 'Load failed'; this.loading = false; }
    });
  }

  submit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Exercise = {
      petId: this.petId,
      date: this.form.value.dateTime,
      activityType: this.form.value.activityType,
      durationMinutes: Number(this.form.value.durationMinutes),
      distanceMiles: Number(this.form.value.distance || 0), // store as miles only
      notes: this.form.value.notes || ''
    };

    if (!this.isEditing) {
      this.api.create(payload).subscribe({
        next: () => { this.successMsg = 'Saved.'; this.resetForm(); this.refresh(); },
        error: err => { this.errorMsg = err?.error?.error || err?.message || 'Save failed'; }
      });
    } else {
      if (!this.editingId) return;
      this.api.update(this.editingId, payload).subscribe({
        next: () => { this.successMsg = 'Updated.'; this.cancelEdit(); this.refresh(); },
        error: err => { this.errorMsg = err?.error?.error || err?.message || 'Update failed'; }
      });
    }
  }

  edit(item: Exercise): void {
    this.isEditing = true;
    this.editingId = item._id || null;

    const dt = new Date(item.date);
    const isoShort = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);

    this.form.patchValue({
      dateTime: isoShort,
      activityType: item.activityType,
      durationMinutes: item.durationMinutes,
      distance: Number((item.distanceMiles || 0).toFixed(2)),
      notes: item.notes || ''
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.resetForm();
  }

  delete(id?: string): void {
    if (!id) return;
    if (!confirm('Delete this exercise entry?')) return;

    this.api.remove(id).subscribe({
      next: () => this.refresh(),
      error: err => { this.errorMsg = err?.error?.error || err?.message || 'Delete failed'; }
    });
  }

  resetForm(): void {
    this.form.reset({
      dateTime: this.nowIsoShort(),
      activityType: 'Walk',
      durationMinutes: 30,
      distance: 0,
      notes: ''
    });
  }

  private nowIsoShort(): string {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  // convenience getter for template (optional)
  get f() { return this.form.controls; }
}
