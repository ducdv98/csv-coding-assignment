import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromStore from "@app/core/store";
import { Observable } from "rxjs";
import { User } from "@shared/models/task.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"],
})
export class NewTaskComponent implements OnInit {
  newTaskForm!: FormGroup;
  users$!: Observable<Array<User>>;

  constructor(
    private store: Store<fromStore.AppState>,
    private dialogRef: MatDialogRef<NewTaskComponent>
  ) {
    this.newTaskForm = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      assigneeId: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(fromStore.allUsers));
  }

  onAddNewTask(): void {
    if (this.newTaskForm.valid) {
      this.store.dispatch(
        fromStore.createTask({ task: this.newTaskForm.value })
      );
      this.dialogRef.close();
    }
  }
}
