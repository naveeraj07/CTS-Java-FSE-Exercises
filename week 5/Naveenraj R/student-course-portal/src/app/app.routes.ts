// Hands-On 7 — top-level routes, nested routes, guards, resolver, and lazy loading.
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { courseResolver } from './resolvers/course.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent, resolve: { course: courseResolver } }
    ]
  },
  { path: 'profile', component: StudentProfileComponent, canActivate: [authGuard] },
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () => import('./features/enrollment/enrollment.routes').then((m) => m.ENROLLMENT_ROUTES)
  },
  { path: '**', component: NotFoundComponent }
];
