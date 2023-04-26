import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Destroyable, takeUntilDestroyed } from "@shared/utils";
import { select, Store } from "@ngrx/store";
import * as fromStore from "@app/core/store";
import { Observable } from "rxjs";
import { Task, User } from "@shared/models/task.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, filter } from "rxjs/operators";
import { allUsers, updateTask } from "@app/core/store";
import { DatePipe } from "@angular/common";

@Destroyable()
@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.scss"],
})
export class TaskDetailsComponent implements OnInit {
  task$: Observable<Task>;
  taskDetailsForm!: FormGroup;
  users$: Observable<Array<User>> = this.store.pipe(select(allUsers));
  loading$ = this.store.pipe(select(fromStore.selectTaskLoading));

  currentTask!: Task;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.AppState>
  ) {
    this.taskDetailsForm = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      assigneeId: new FormControl(null, [Validators.required]),
      createdDate: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this)).subscribe({
      next: (params) => {
        if (params["id"]) {
          const taskId = parseInt(params["id"], 10);
          this.store.dispatch(fromStore.getTask({ taskId }));
          this.task$ = this.store.pipe(
            select(fromStore.selectTaskById(taskId))
          );
        }
      },
    });

    this.task$
      .pipe(
        filter((task) => !!task),
        takeUntilDestroyed(this)
      )
      .subscribe({
        next: (task) => {
          this.currentTask = task;
          this.taskDetailsForm.patchValue(
            {
              assigneeId: task.assigneeId,
              description: task.description,
              createdDate: new DatePipe("en").transform(
                task.createdDate,
                "medium"
              ),
            },
            { emitEvent: false }
          );
        },
      });
  }

  updateTask(): void {
    if (this.taskDetailsForm.valid) {
      const partial = {
        ...this.currentTask,
        description: this.taskDetailsForm.value.description,
        assigneeId: this.taskDetailsForm.value.assigneeId,
      };
      this.store.dispatch(updateTask({ partial, loadingRequired: true }));
    }
  }
}
