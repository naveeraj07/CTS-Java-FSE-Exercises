// Hands-On 7, Task 1 — Resolve: pre-fetches the course before the CourseDetailComponent activates,
// so the component always renders with data already available (no manual loading flag needed).
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';

export const courseResolver: ResolveFn<Course> = (route: ActivatedRouteSnapshot): Observable<Course> => {
  const courseService = inject(CourseService);
  const id = Number(route.paramMap.get('id'));
  return courseService.getCourseById(id);
};
