import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PetService, Pet } from './pet.service';

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit {
  form: FormGroup;
  pets: Pet[] = [];
  selectedPet: Pet | null = null;
  editingId: string | null = null;

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private petApi: PetService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      breed: [''],
      birthday: [''],
      weight: [''],
      summary: [''],
      medicalInfo: ['']
    });
  }

  ngOnInit(): void {
    this.loadPets();
  }

  private loadPets(): void {
    this.loading = true;
    this.errorMsg = '';
    this.petApi.list().subscribe({
      next: data => {
        this.pets = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error loading pet profiles.';
        this.loading = false;
      }
    });
  }

  selectPet(pet: Pet): void {
    this.selectedPet = pet;
    this.successMsg = '';
    this.errorMsg = '';
  }

  clearSelection(): void {
    this.selectedPet = null;
  }

  submit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.invalid) {
      this.errorMsg = 'Please complete required fields.';
      this.form.markAllAsTouched();
      return;
    }

    const base = this.form.value;
    const payload: Pet = {
      ...base,
      weight: base.weight ? Number(base.weight) : undefined
    };

    if (this.editingId) {
      this.petApi.update(this.editingId, payload).subscribe({
        next: updated => {
          const idx = this.pets.findIndex(p => p._id === this.editingId);
          if (idx > -1) {
            this.pets[idx] = updated;
          }
          if (this.selectedPet && this.selectedPet._id === this.editingId) {
            this.selectedPet = updated;
          }
          this.editingId = null;
          this.form.reset();
          this.successMsg = 'Pet profile updated.';
        },
        error: () => {
          this.errorMsg = 'Error updating pet profile.';
        }
      });
    } else {
      this.petApi.create(payload).subscribe({
        next: created => {
          this.pets.unshift(created);
          this.form.reset();
          this.successMsg = 'Pet profile created.';
        },
        error: () => {
          this.errorMsg = 'Error creating pet profile.';
        }
      });
    }
  }

  edit(pet: Pet): void {
    if (!pet._id) return;
    this.editingId = pet._id;
    this.form.reset({
      name: pet.name,
      type: pet.type,
      breed: pet.breed || '',
      birthday: pet.birthday || '',
      weight: pet.weight ?? '',
      summary: pet.summary || '',
      medicalInfo: pet.medicalInfo || ''
    });
    this.selectedPet = pet;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.successMsg = '';
    this.errorMsg = '';
  }

  remove(pet: Pet): void {
    if (!pet._id) return;
    if (!confirm(`Delete profile for ${pet.name}?`)) return;

    this.errorMsg = '';
    this.successMsg = '';

    this.petApi.delete(pet._id).subscribe({
      next: () => {
        this.pets = this.pets.filter(p => p._id !== pet._id);
        if (this.selectedPet && this.selectedPet._id === pet._id) {
          this.selectedPet = null;
        }
        if (this.editingId === pet._id) {
          this.editingId = null;
          this.form.reset();
        }
        this.successMsg = 'Pet profile deleted.';
      },
      error: () => {
        this.errorMsg = 'Error deleting pet profile.';
      }
    });
  }
}
