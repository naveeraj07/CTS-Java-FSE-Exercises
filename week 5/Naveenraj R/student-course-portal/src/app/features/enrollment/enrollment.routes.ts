// Hands-On 7, Task 2, step 73 — lazily loaded feature routes for the enrollment feature.
import { Routes } from '@angular/router';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './reactive-enrollment-form/reactive-enrollment-form.component';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

export const ENROLLMENT_ROUTES: Routes = [
  { path: '', component: EnrollmentFormComponent },
  { path: 'reactive', component: ReactiveEnrollmentFormComponent, canDeactivate: [unsavedChangesGuard] }
];
