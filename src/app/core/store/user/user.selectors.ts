import { selectUserState, userAdapter } from "./user.reducers";
import { createSelector } from "@ngrx/store";

const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = userAdapter.getSelectors();

export const allUsers = createSelector(selectUserState, selectAllUsers);

export const selectUsersByIds = (ids: Array<number> | undefined) =>
  createSelector(allUsers, (users) => {
    if (!!users && !!ids) {
      return users.filter((u) => ids.includes(u.id));
    }

    return [];
  });

export const selectUserById = (id: number | undefined) =>
  createSelector(allUsers, (users) => {
    if (!!users && !!id) {
      return users.find((u) => u.id === id);
    }

    return null;
  });
