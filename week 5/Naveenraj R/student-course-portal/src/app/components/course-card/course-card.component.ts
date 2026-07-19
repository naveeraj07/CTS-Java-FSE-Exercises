import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnChanges {
  // Hands-On 2, Task 3, steps 20-21
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  private enrollmentService = inject(EnrollmentService);

  // Hands-On 3, Task 2, step 31
  isExpanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('course changed from', changes['course'].previousValue, 'to', changes['course'].currentValue);
    }
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    this.enrollmentService.enroll(this.course.id);
    this.enrollRequested.emit(this.course.id);
  }

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  // Hands-On 3, Task 2, step 32 — a getter keeps the template free of inline object literals.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded
    };
  }

  get borderColor(): string {
    switch (this.course.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      default: return 'grey';
    }
  }
}
