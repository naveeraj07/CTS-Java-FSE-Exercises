// Hands-On 5 — reactive form with FormBuilder, custom sync/async validators, and FormArray.
import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';

// Hands-On 5, Task 2, step 53 — custom synchronous validator.
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string | number | null;
  return value != null && String(value).startsWith('XX') ? { noCourseCode: true } : null;
}

// Hands-On 5, Task 2, step 55 — custom async validator (simulated backend check).
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(String(control.value ?? '').includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrls: ['./reactive-enrollment-form.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  enrollForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck]),
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // Hands-On 5, Task 2, step 57 — a typed getter avoids repeated casting in the template.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.enrollForm.value); // excludes disabled controls
    console.log(this.enrollForm.getRawValue()); // includes all controls, disabled or not

    if (this.enrollForm.valid) {
      this.courseService
        .createCourse({
          name: this.enrollForm.value.studentName,
          code: `REQ-${this.enrollForm.value.courseId}`,
          credits: 0,
          gradeStatus: 'pending'
        })
        .subscribe({
          next: () => {
            this.submitted = true;
            this.enrollForm.markAsPristine();
          },
          error: (err) => console.error(err)
        });
    }
  }

  // Backs the CanDeactivate guard (Hands-On 7, Task 2, step 77).
  hasUnsavedChanges(): boolean {
    return this.enrollForm.dirty && !this.submitted;
  }
}
