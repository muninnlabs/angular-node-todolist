import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../interfaces/interfaces';
import { HeaderComponent } from '../header/header.component';
import { TasksService } from './../../services/tasks.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HeaderComponent,
    MatSelectModule,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
})
export class TaskEditComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TasksService);
  public taskForm: FormGroup;
  public id: any;
  public task = signal<Task>({});

  private sub: Subscription = new Subscription();

  constructor() {
    this.id = this.route.snapshot.params['id'];
    this.taskForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log('aaaaa', this.task());
    if (this.id !== 'new') {
      this.loadTask();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public save() {
    if (this.id === 'new') {
      this.taskService.createTask(this.taskForm.value).subscribe((response) => {
        this.taskForm.patchValue({
          title: response.title,
          description: response.description,
          status: response.status,
        });
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.saveTask(this.taskForm.value).subscribe((response) => {
        this.taskForm.patchValue({
          title: response.title,
          description: response.description,
          status: response.status,
        });
        this.router.navigate(['/tasks']);
      });
    }
  }

  public cancel() {
    this.router.navigate(['/tasks']);
  }

  private loadTask() {
    this.sub = this.taskService.getTask(this.id).subscribe((response) => {
      console.log('loadTask', response);

      this.taskForm.patchValue({
        id: this.id,
        title: response.title,
        description: response.description,
        status: response.status,
      });
    });
  }
}
