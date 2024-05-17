import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { tasksGuard } from './guards/tasks.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [tasksGuard],
  },
  {
    path: 'task/:id',
    component: TaskEditComponent,
    canActivate: [tasksGuard],
  },
];
