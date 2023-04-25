import { createAction, props } from "@ngrx/store";
import { Task, TaskFilter } from "@shared/models/task.model";

const ACTION_PREFIX = "[Tasks]";

export const getTasks = createAction(`${ACTION_PREFIX} Get tasks`);

export const getTasksSuccess = createAction(
  `${ACTION_PREFIX} Get tasks success`,
  props<{ tasks: Array<Task> }>()
);

export const getTasksError = createAction(
  `${ACTION_PREFIX} Get tasks error`,
  props<{ error: string }>()
);

export const getTask = createAction(
  `${ACTION_PREFIX} Get task`,
  props<{ taskId: number }>()
);

export const getTaskSuccess = createAction(
  `${ACTION_PREFIX} Get task success`,
  props<{ task: Task }>()
);

export const getTaskError = createAction(
  `${ACTION_PREFIX} Get task error`,
  props<{ error: string }>()
);

export const updateTask = createAction(
  `${ACTION_PREFIX} Update task`,
  props<{ partial: Task }>()
);

export const updateTaskSuccess = createAction(
  `${ACTION_PREFIX} Update task success`,
  props<{ partial: Task }>()
);

export const updateTaskError = createAction(
  `${ACTION_PREFIX} Update task error`,
  props<{ error: string }>()
);

export const createTask = createAction(
  `${ACTION_PREFIX} Create task`,
  props<{ task: Task }>()
);

export const createTaskSuccess = createAction(
  `${ACTION_PREFIX} Create task success`,
  props<{ task: Task }>()
);

export const createTaskError = createAction(
  `${ACTION_PREFIX} Create task error`,
  props<{ error: string }>()
);

export const updateTaskFilters = createAction(
  `${ACTION_PREFIX} Update task filters`,
  props<{ filters: TaskFilter }>()
);
