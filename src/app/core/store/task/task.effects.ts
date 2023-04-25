import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";

import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { of } from "rxjs";
import { select, Store } from "@ngrx/store";

import * as actions from "./task.actions";

import { TaskState } from "./task.reducers";
import { TaskService } from "@shared/services/task.service";
import { getTaskError, updateTaskError } from "./task.actions";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable()
export class TaskEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTasks),
      mergeMap(() =>
        this.taskService.tasks().pipe(
          map((tasks) => actions.getTasksSuccess({ tasks })),
          catchError((error) => of(actions.getTasksError({ error })))
        )
      )
    )
  );

  getTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTask),
      mergeMap(({ taskId }) =>
        this.taskService.task(taskId).pipe(
          map((task) => actions.getTaskSuccess({ task })),
          catchError((error) => of(getTaskError({ error })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createTask),
      switchMap(({ task }) =>
        this.taskService.newTask(task).pipe(
          map((createdTask) =>
            actions.createTaskSuccess({ task: createdTask })
          ),
          catchError((error) => of(actions.createTaskError({ error })))
        )
      )
    )
  );

  createTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.createTaskSuccess),
        tap((_) => this.toast.success("Create task successful!"))
      ),
    { dispatch: false }
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateTask),
      switchMap(({ partial }) =>
        this.taskService.update(partial.id, partial).pipe(
          map((_) => actions.updateTaskSuccess({ partial })),
          catchError((error) => of(actions.updateTaskError({ error })))
        )
      )
    )
  );

  updateTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updateTaskSuccess),
        tap((_) => this.toast.success("Update task successful!"))
      ),
    { dispatch: false }
  );

  errorNotifier$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.createTaskError, updateTaskError),
        tap(({ error }) => this.toast.success(error))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<TaskState>,
    private toast: HotToastService
  ) {}
}
