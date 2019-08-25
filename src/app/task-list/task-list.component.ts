import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { Task } from '../Task';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})

export class TaskListComponent {
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  displayedColumns: string[] = ['position', 'added_date', 'title', 'category', 'actions'];
  dataSource = new TaskDataSource(this.dataService);

  openDialog(): void {
    let dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',
      data: 'Add Task'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.taskAdd(result.data);
      this.dataSource = new TaskDataSource(this.dataService);
    });
  }

  taskDelete(id) {
    this.dataService.taskDelete(id);
    this.dataSource = new TaskDataSource(this.dataService);
  }

  taskEdit(id) {
    this.dialog.open(TaskDetailsComponent, {
      width: '600px',
      data: {title: 'Not implemented yet'}
    });
  }

  taskDetails(id) {
    this.dialog.open(TaskDetailsComponent, {
      width: '600px',
      data: {title: 'Task Details', index: id}
    });
  }
}

export class TaskDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Task[]> {
    return this.dataService.getData();
  }

  disconnect() {}
}