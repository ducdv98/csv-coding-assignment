import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Destroyable, takeUntilDestroyed } from "@shared/utils";
import { debounceTime, tap } from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";
import { TaskFilter, User } from "@shared/models/task.model";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as fromStore from "@app/core/store";

@Destroyable()
@Component({
  selector: "app-task-action",
  templateUrl: "./task-action.component.html",
  styleUrls: ["./task-action.component.scss"],
})
export class TaskActionComponent implements OnInit {
  @Output() updateTaskFilters = new EventEmitter();
  @Output() newTask = new EventEmitter();

  filterFormGroup: FormGroup;
  users$!: Observable<Array<User>>;

  constructor(private store: Store<fromStore.AppState>) {
    this.filterFormGroup = new FormGroup({
      desc: new FormControl(""),
      assignees: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(fromStore.allUsers));

    this.filterFormGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this),
        debounceTime(300),
        tap((filters) => this.updateFilters(filters))
      )
      .subscribe();
  }

  updateFilters(filters: TaskFilter): void {
    this.updateTaskFilters.emit(filters);
  }
}
