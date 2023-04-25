import { createAction, props } from "@ngrx/store";
import { TaskColumn } from "@shared/models/task.model";

const ACTION_PREFIX = "[Columns]";

export const getColumns = createAction(`${ACTION_PREFIX} Get columns`);

export const getColumnsSuccess = createAction(
  `${ACTION_PREFIX} Get columns success`,
  props<{ columns: Array<TaskColumn> }>()
);

export const getColumnsError = createAction(
  `${ACTION_PREFIX} Get columns error`,
  props<{ error: string }>()
);
