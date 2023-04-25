import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";

import * as actions from "./user.actions";
import { User } from "@shared/models/task.model";

export interface UserState extends EntityState<User> {
  loading: boolean;
  error: string;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialUserState: UserState = userAdapter.getInitialState({
  loading: false,
  error: "",
});

const reducer = createReducer(
  initialUserState,
  on(actions.getUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.getUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, {
      ...state,
      loading: false,
    })
  ),
  on(actions.getUsersError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export const userReducer = (state: UserState | undefined, action: Action) =>
  reducer(state, action);

export const selectUserState = createFeatureSelector<UserState>("users");
