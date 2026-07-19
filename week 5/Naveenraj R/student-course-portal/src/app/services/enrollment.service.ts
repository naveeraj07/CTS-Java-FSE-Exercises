// Hands-On 6, Task 2 — depends on CourseService (service-to-service injection).
import { Injectable, inject } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private courseService = inject(CourseService);
  private enrolledCourseIds: number[] = [];

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService
      .getCourses()
      .pipe(map((courses) => courses.filter((c) => this.enrolledCourseIds.includes(c.id))));
  }

  // Hands-On 8, Task 2, step 87 — used with switchMap when a course is selected.
  getStudentsByCourse(courseId: number): Observable<string[]> {
    // Simulated for the mock backend; a real API would hit /courses/:id/students.
    return this.courseService.getCourseById(courseId).pipe(map(() => ['Aarav Kumar']));
  }
}
