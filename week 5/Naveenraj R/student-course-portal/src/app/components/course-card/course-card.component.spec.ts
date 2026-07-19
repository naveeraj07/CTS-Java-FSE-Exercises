import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  const mockCourse: Course = { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' };

  let component: CourseCardComponent;
  let fixture: ReturnType<typeof TestBed.createComponent<CourseCardComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the course name from @Input', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('h3')).nativeElement.textContent;
    expect(heading).toContain('Data Structures');
  });

  it('should emit enrollRequested with the course id on enroll click', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    spyOn(component.enrollRequested, 'emit');

    fixture.debugElement.query(By.css('.actions button')).nativeElement.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log previous and current course on ngOnChanges', () => {
    spyOn(console, 'log');
    component.course = mockCourse;
    component.ngOnChanges({
      course: new SimpleChange(undefined, mockCourse, true)
    });
    expect(console.log).toHaveBeenCalled();
  });

  it('should toggle isExpanded on Show Details click', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component.isExpanded).toBeFalse();
    component.toggleExpanded();
    expect(component.isExpanded).toBeTrue();
  });
});
