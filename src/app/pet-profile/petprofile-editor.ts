import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PetEntry {
  petName: string;
  petType: string;
  petBreed?: string;
  birthday?: string;
  weight?: number | string;
  summary?: string;
}

interface MedicalHistoryEntry {
  date: string;
  type: string;
  description: string;
  nextDue?: string;
}

@Component({
  selector: 'app-profile-editor',
  templateUrl: './petprofile-editor.html',
  styleUrls: ['./petprofile-editor.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ProfileEditor {
  formBuilder: FormBuilder = inject(FormBuilder);

  // Sample pet entries
  petEntries: PetEntry[] = [
    {
      petName: 'Trixy',
      petType: 'Cat',
      petBreed: 'Siamese',
      birthday: '2019-03-21',
      weight: 9,
      summary: 'Playful and curious'
    }
  ];

  editingIndex: number | null = null;
  petForm: FormGroup = this.formBuilder.group({
    petName: ['', Validators.required],
    petType: [''],
    petBreed: [''],
    birthday: [''],
    weight: ['']
  });

  medicalHistory: MedicalHistoryEntry[] = [
    { 
      date: '2025-10-20', 
      type: 'Vaccination', 
      description: 'Annual shots',
      nextDue: '2026-10-20'
    }
  ];
  
  profileForm = this.formBuilder.group({
    petName: ['', Validators.required],
    petType: ['', Validators.required],
    petBreed: ['', Validators.required],
    birthday: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0)]],
    petSummary: [''],
    medInfo: this.formBuilder.group({
      vaccine: [''],
      allergies: [''],
      medications: ['']
    })
  });

  updateProfile() {
    if (this.profileForm.valid) {
      console.log('Saving profile:', this.profileForm.value);
    }
  }

  addPetEntry(entry: PetEntry) {
    this.petEntries.unshift(entry);
  }

  editPetEntry(index: number, updatedEntry: PetEntry) {
    this.petEntries[index] = updatedEntry;
  }

  deletePetEntry(index: number) {
    this.petEntries.splice(index, 1);
  }

  onSubmitPet() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }

    const value = this.petForm.value as PetEntry;
    if (this.editingIndex !== null) {
      this.editPetEntry(this.editingIndex, value);
      this.editingIndex = null;
    } else {
      this.addPetEntry(value);
    }

    this.petForm.reset();
  }

  onEditPet(index: number) {
    const pet = this.petEntries[index];
    this.petForm.patchValue(pet as any);
    this.editingIndex = index;
  }

  onDeletePet(index: number) {
    const confirmDelete = window.confirm(`Delete pet ${this.petEntries[index].petName}?`);
    if (confirmDelete) this.deletePetEntry(index);
  }

  addMedicalEntry(entry: MedicalHistoryEntry) {
    this.medicalHistory.unshift(entry);
  }

  editMedicalEntry(index: number, updatedEntry: MedicalHistoryEntry) {
    this.medicalHistory[index] = updatedEntry;
  }

  deleteMedicalEntry(index: number) {
    this.medicalHistory.splice(index, 1);
  }
}
