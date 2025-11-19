 import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { VetService } from './vet.service';   // <= same folder now
import { VetVisit } from './vet-visit.interface';


@Component({
  selector: 'app-vet-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './vet-log.component.html',
  styleUrls: ['./vet-log.component.css']
})

export class VetLogComponent implements OnInit {
  errorMsg = '';
  successMsg = '';
  editingId: string | null = null;
  petFilter = '';

  visits: VetVisit[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private vet: VetService) {
    this.form = fb.group({
      petId: ['', Validators.required],
      date: ['', Validators.required],
      reason: ['', Validators.required],
      vetName: ['', Validators.required],
      diagnosis: [''],
      treatment: [''],
      nextAppointment: ['']
    });
  }

  ngOnInit() { this.refresh(); }

  refresh() { this.visits = this.vet.list(); }

  get totalVisits() { return this.visits.length; }
  get visitsLast7Days() {
    const seven = new Date(Date.now() - 7*24*60*60*1000);
    return this.visits.filter(v => new Date(v.date) >= seven).length;
  }
  get upcomingAppts() {
    const now = new Date();
    return this.visits.filter(v => v.nextAppointment && new Date(v.nextAppointment) >= now).length;
  }

  filtered() {
    const f = this.petFilter.trim().toLowerCase();
    return f ? this.visits.filter(v => v.petId.toLowerCase() === f) : this.visits;
  }

  uniquePets() {
    return Array.from(new Set(this.visits.map(v => v.petId.trim()))).sort();
  }

  clearFilter() { this.petFilter = ''; }

  submit() {
    this.errorMsg = ''; this.successMsg = '';
    if (this.form.invalid) {
      this.errorMsg = 'Please complete all required fields.';
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();
    if (!this.editingId) {
      this.vet.add(data);
      this.successMsg = 'Vet visit added.';
    } else {
      this.vet.update(this.editingId, data);
      this.successMsg = 'Vet visit updated.';
      this.editingId = null;
    }
    this.form.reset();
    this.refresh();
  }

  edit(v: VetVisit) {
    this.editingId = v._id;
    this.form.reset(v);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  remove(v: VetVisit) {
    if (confirm('Delete this record?')) {
      this.vet.delete(v._id).subscribe();
    }
  }
}
