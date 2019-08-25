import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from '../data/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.less']
})

export class TaskDialogComponent implements OnInit {
  task = {
    position: 0,
    title: '',
    body: '',
    category: '',
    type: '',
    added_date: new Date()
  };

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) {}

  taskForm: FormGroup;
  title: FormControl;
  description: FormControl;
  category: FormControl;
  type: FormControl;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-ZźćńąśłęóŻŹĆŃĄŚŁĘÓ ]*$"),
    ]);
    this.description = new FormControl('', [
      Validators.required
    ]);
    this.category = new FormControl('', [
      Validators.required,
    ]);
    this.type = new FormControl('', [
      Validators.required,
    ]);
  }

  createForm() {
    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
      category: this.category,
      type: this.type
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.task.position = this.dataService.dataLength();
    this.event.emit({data: this.task});
    this.dialogRef.close();
  }

  categories = this.dataService.getCategories();
  types = this.dataService.getTypes();
}