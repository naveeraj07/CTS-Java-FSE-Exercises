import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { NotificationComponent } from '../../components/notification/notification.component';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { loadCourses } from '../../store/course/course.actions';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, NotificationComponent],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  private store = inject(Store);
  enrolledCourses$: Observable<Course[]> = this.store.select(selectEnrolledCourses);

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }
}
