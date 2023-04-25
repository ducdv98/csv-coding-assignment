import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Task, TaskColumn } from "@shared/models/task.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import * as fromStore from "@app/core/store";
import { select, Store } from "@ngrx/store";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-board-column",
  templateUrl: "./board-column.component.html",
  styleUrls: ["./board-column.component.scss"],
})
export class BoardColumnComponent implements OnChanges {
  @Input() column!: TaskColumn;

  tasks$!: Observable<Array<Task>>;

  constructor(
    private router: Router,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.column && changes.column) {
      this.tasks$ = this.store.pipe(
        select(fromStore.selectTasksByColumnIdWithFilters(this.column.id))
      );
    }
  }

  onTaskDropped(event: CdkDragDrop<Array<any>>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const partial = {
        id: event.item.data,
        columnId: parseInt(event.container.id, 10),
      };

      this.store.dispatch(fromStore.updateTask({ partial }));
    }
  }

  onGoToTaskDetails(taskId: number) {
    void this.router.navigate(["", "tasks", taskId]);
  }
}
