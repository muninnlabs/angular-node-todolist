import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../interfaces/interfaces';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',
})
export class TaskDialogComponent implements OnInit {
  private taskService = inject(TasksService);
  public taskForm: FormGroup;
  task: Task;

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) task: Task
  ) {
    this.task = task;
    this.taskForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.taskForm.patchValue({
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    this.taskService.saveTask(this.taskForm.value).subscribe((response) => {
      this.taskForm.patchValue({
        title: response.title,
        description: response.description,
        status: response.status,
      });
      this.dialogRef.close(response);
    });
  }
}
