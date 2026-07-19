# Student Course Portal — Angular v20 Hands-On Solutions

Digital Nurture 5.0 | .NET Full Stack Engineer Track | Angular Hands-On Exercise Book

All 10 hands-on exercises are implemented in this single project, using Angular 20's
standalone-components API (no NgModules) as recommended by the exercise book's hints.

## Where each hands-on lives

| Hands-On | Topic | Key files |
|---|---|---|
| 1 | Setup, structure, first components | `notes.txt`, `angular.json`, `src/app/components/header`, `src/app/pages/home` |
| 2 | Binding, lifecycle, @Input/@Output | `pages/home`, `components/course-card`, `pages/course-list` |
| 3 | Directives & pipes | `directives/highlight.directive.ts`, `pipes/credit-label.pipe.ts` |
| 4 | Template-driven forms | `features/enrollment/enrollment-form` |
| 5 | Reactive forms | `features/enrollment/reactive-enrollment-form` |
| 6 | Services & DI | `services/course.service.ts`, `services/enrollment.service.ts`, `components/notification` |
| 7 | Routing, guards, lazy loading | `app.routes.ts`, `guards/`, `resolvers/`, `features/enrollment/enrollment.routes.ts` |
| 8 | HttpClient & interceptors | `services/course.service.ts`, `interceptors/` |
| 9 | NgRx state management | `store/course/`, `store/enrollment/` |
| 10 | Unit testing | every `*.spec.ts` file |

## Running it

This sandbox has no network access, so the project could not be `npm install`ed or run here.
On your machine:

```bash
npm install
npm install -g json-server   # if not already installed

# terminal 1 — mock backend (courses come from db.json)
json-server --watch db.json --port 3000

# terminal 2 — app
npm start                    # ng serve, http://localhost:4200

# unit tests
npm test                     # ng test (Karma + Jasmine)
npm run test -- --code-coverage
```
