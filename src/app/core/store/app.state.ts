import { ActionReducerMap } from "@ngrx/store";

import { ColumnEffects, columnReducer, ColumnState } from "./column";
import { TaskEffects, taskReducer, TaskState } from "./task";
import { UserEffects, userReducer, UserState } from "./user";

export interface AppState {
  columns: ColumnState;
  tasks: TaskState;
  users: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  columns: columnReducer,
  tasks: taskReducer,
  users: userReducer,
};

export const effects = [ColumnEffects, TaskEffects, UserEffects];
