import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { Task, TaskFilter } from "@shared/models/task.model";

import * as actions from "./task.actions";

export interface TaskState extends EntityState<Task> {
  filters: TaskFilter;
  loading: boolean;
  error: string | null;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

const initialTaskState: TaskState = taskAdapter.getInitialState({
  filters: {
    desc: "",
    assignees: [],
  },
  loading: false,
  error: null,
});

const reducer = createReducer(
  initialTaskState,
  on(actions.getTasks, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.getTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, {
      ...state,
      loading: false,
    })
  ),
  on(actions.getTasksError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(actions.getTask, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.getTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, {
      ...state,
      loading: false,
    })
  ),
  on(actions.getTaskError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(actions.updateTask, (state, { partial }) => {
    const task = { ...state.entities[partial.id] };
    return taskAdapter.updateOne(
      {
        id: partial.id,
        changes: {
          ...task,
          ...partial,
        },
      },
      { ...state, loading: true }
    );
  }),
  on(actions.updateTaskSuccess, (state, { partial }) => ({
    ...state,
    loading: false,
  })),
  on(actions.updateTaskError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(actions.createTask, (state, { task }) => ({
    ...state,
    loading: true,
  })),
  on(actions.createTaskSuccess, (state, { task }) => {
    return taskAdapter.upsertOne(task, { ...state, loading: false });
  }),
  on(actions.createTaskError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(actions.updateTaskFilters, (state, { filters }) => ({
    ...state,
    filters,
  }))
);

export const taskReducer = (state: TaskState | undefined, action: Action) =>
  reducer(state, action);

export const selectTaskState = createFeatureSelector<TaskState>("tasks");
