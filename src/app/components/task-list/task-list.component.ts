import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../interfaces/interfaces';
import { TasksService } from '../../services/tasks.service';
import { HeaderComponent } from '../header/header.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatIconModule, HeaderComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TasksService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  public taskList = signal<Task[]>([]);

  private sub: Subscription = new Subscription();

  constructor() {
    // this.taskList = toSignal(this.taskService.getTasks(), {
    //   initialValue: [],
    // });
  }

  ngOnInit() {
    this.loadTasks();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public showDetails(task: Task) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = task;

    const dialogRef = this.dialog
      .open(TaskDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        this.loadTasks();
      });

    console.log(`Editing task`, dialogRef);
  }

  public editTask(task: Task) {
    console.log(`Editing task with id: ${task.id}`);
    this.router.navigate(['task', task.id]);
  }

  public deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.sub = this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  public loadTasks() {
    this.sub = this.taskService.getTasks().subscribe((tasks) => {
      this.taskList.set(tasks);
    });
  }
}
