import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  course: Course | null = null;

  ngOnInit(): void {
    // Hands-On 7, step 69 read via snapshot param; the course itself now arrives pre-loaded
    // via the courseResolver (Hands-On 7, Task 1) so no manual loading state is needed here.
    this.course = this.route.snapshot.data['course'] ?? null;
  }
}
