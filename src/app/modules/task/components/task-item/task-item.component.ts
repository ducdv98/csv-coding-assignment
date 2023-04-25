import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Task, User } from "@shared/models/task.model";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as fromStore from "@app/core/store";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnChanges {
  @Input() task!: Task;
  @Input() loading: boolean = false;
  @Output() goToDetails = new EventEmitter<number>();

  assignee$!: Observable<User | null | undefined>;

  constructor(private store: Store<fromStore.AppState>) {}

  ontTaskClick(): void {
    this.goToDetails.emit(this.task.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const task = changes.task;

    if (task && task.previousValue !== task.currentValue && this.task) {
      this.assignee$ = this.store.pipe(
        select(fromStore.selectUserById(this.task?.assigneeId))
      );
    }
  }
}
