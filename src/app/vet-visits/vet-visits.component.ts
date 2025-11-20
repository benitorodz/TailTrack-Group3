import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { VetService, VetVisit } from './vet.service';

@Component({
  selector: 'app-vet-visits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './vet-visits.component.html',
  styleUrls: ['./vet-visits.component.css']
})
export class VetVisitsComponent implements OnInit {
  form: FormGroup;
  visits: VetVisit[] = [];
  editingId: string | null = null;

  // Filters / summary
  petFilter = '';
  visitsLast7Days = 0;
  totalVisits = 0;
  upcomingAppts = 0;

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private vet: VetService
  ) {
    this.form = this.fb.group({
      petId: ['', Validators.required],
      date: ['', Validators.required],
      vetName: ['', Validators.required],
      reason: ['', Validators.required],
      diagnosis: [''],
      treatment: [''],
      nextAppointment: ['']
    });
  }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.errorMsg = '';
    // Pass empty string to fetch all visits (backend treats empty petId as no filter)
    this.vet.list('').subscribe({
      next: data => {
        this.visits = data;
        this.loading = false;
        this.recalculateStats();
      },
      error: () => {
        this.errorMsg = 'Error loading vet visits.';
        this.loading = false;
      }
    });
  }

  private recalculateStats(): void {
    this.totalVisits = this.visits.length;

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    this.visitsLast7Days = this.visits.filter(v => {
      if (!v.date) return false;
      const d = new Date(v.date);
      return d >= sevenDaysAgo && d <= now;
    }).length;

    this.upcomingAppts = this.visits.filter(v => {
      if (!v.nextAppointment) return false;
      const d = new Date(v.nextAppointment);
      return d >= now;
    }).length;
  }

  // Pet filter helpers (for the table filter & dropdown)
  filtered(): VetVisit[] {
    const f = this.petFilter.trim().toLowerCase();
    if (!f) return this.visits;
    return this.visits.filter(v => v.petId && v.petId.toLowerCase() === f);
  }

  uniquePets(): string[] {
    const set = new Set<string>();
    for (const v of this.visits) {
      if (v.petId && v.petId.trim()) {
        set.add(v.petId.trim());
      }
    }
    return Array.from(set).sort();
  }

  clearFilter(): void {
    this.petFilter = '';
  }

  submit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.invalid) {
      this.errorMsg = 'Please complete all required fields.';
      this.form.markAllAsTouched();
      return;
    }

    const base = this.form.value;
    const payload: VetVisit = {
      ...base   // keep whatever the user typed for petId (e.g., "Luna")
    };

    if (this.editingId) {
      this.vet.update(this.editingId, payload).subscribe({
        next: updated => {
          const idx = this.visits.findIndex(v => v._id === this.editingId);
          if (idx > -1) {
            this.visits[idx] = updated;
          }
          this.editingId = null;
          this.form.reset();
          this.recalculateStats();
          this.successMsg = 'Visit updated.';
        },
        error: () => {
          this.errorMsg = 'Error updating visit.';
        }
      });
    } else {
      this.vet.create(payload).subscribe({
        next: created => {
          this.visits.unshift(created);
          this.form.reset();
          this.recalculateStats();
          this.successMsg = 'Visit added.';
        },
        error: () => {
          this.errorMsg = 'Error adding visit.';
        }
      });
    }
  }

  edit(v: VetVisit): void {
    if (!v._id) return;
    this.editingId = v._id;
    this.form.reset({
      petId: v.petId || '',
      date: v.date,
      vetName: v.vetName,
      reason: v.reason,
      diagnosis: v.diagnosis || '',
      treatment: v.treatment || '',
      nextAppointment: v.nextAppointment || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.successMsg = '';
    this.errorMsg = '';
  }

  remove(v: VetVisit): void {
    if (!v._id) return;
    if (!confirm('Delete this record?')) return;

    this.errorMsg = '';
    this.successMsg = '';

    this.vet.delete(v._id).subscribe({
      next: () => {
        this.visits = this.visits.filter(x => x._id !== v._id);
        this.recalculateStats();
        if (this.editingId === v._id) {
          this.editingId = null;
          this.form.reset();
        }
        this.successMsg = 'Visit deleted.';
      },
      error: () => {
        this.errorMsg = 'Error deleting visit.';
      }
    });
  }
}

