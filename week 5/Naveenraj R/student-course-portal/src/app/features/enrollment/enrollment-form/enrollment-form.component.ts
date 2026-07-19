// Hands-On 4 — template-driven form.
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

// Hands-On 2, Task 1, step 15:
// [property] is one-way, component -> DOM only (e.g. [disabled]="!isPortalActive").
// [(ngModel)] is two-way, DOM <-> component: it both writes the value into the DOM
// and listens for DOM changes to write back into the component property.
@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester: 'Odd' | 'Even' = 'Odd';
  agreeToTerms = false;

  submitted = false;

  onSubmit(form: NgForm): void {
    console.log(form.value, form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }
}
