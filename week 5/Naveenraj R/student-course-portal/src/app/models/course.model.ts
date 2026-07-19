// Hands-On 6, Task 1 — shared Course type used across services, components, and the NgRx store.
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}
