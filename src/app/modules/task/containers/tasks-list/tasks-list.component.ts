import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromStore from "@app/core/store";
import { Observable } from "rxjs";
import { TaskColumn, TaskFilter } from "@shared/models/task.model";
import { MatDialog } from "@angular/material/dialog";
import { NewTaskComponent } from "../new-task/new-task.component";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit {
  columns$!: Observable<Array<TaskColumn>>;
  loading$ = this.store.pipe(select(fromStore.selectTaskLoading));
  constructor(
    private store: Store<fromStore.AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromStore.getTasks());
    this.store.dispatch(fromStore.getColumns());
    this.store.dispatch(fromStore.getUsers());

    this.columns$ = this.store.pipe(select(fromStore.allColumns));
  }

  updateTaskFilters(filters: TaskFilter): void {
    this.store.dispatch(fromStore.updateTaskFilters({ filters }));
  }

  openNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }
}
