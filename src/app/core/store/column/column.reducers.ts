import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";

import * as actions from "./column.actions";
import { TaskColumn } from "@shared/models/task.model";

export interface ColumnState extends EntityState<TaskColumn> {
  loading: boolean;
  error: string;
}

export const columnAdapter: EntityAdapter<TaskColumn> =
  createEntityAdapter<TaskColumn>();

const initialColumnState: ColumnState = columnAdapter.getInitialState({
  loading: false,
  error: "",
});

const reducer = createReducer(
  initialColumnState,
  on(actions.getColumns, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.getColumnsSuccess, (state, { columns }) =>
    columnAdapter.setAll(columns, {
      ...state,
      loading: false,
    })
  ),
  on(actions.getColumnsError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export const columnReducer = (state: ColumnState | undefined, action: Action) =>
  reducer(state, action);

export const selectColumnState = createFeatureSelector<ColumnState>("columns");
