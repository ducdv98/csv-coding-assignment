import { createSelector } from "@ngrx/store";

import { selectTaskState, taskAdapter } from "./task.reducers";

const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTotalTasks,
} = taskAdapter.getSelectors();

export const allTasks = createSelector(selectTaskState, selectAllTasks);

export const taskFilters = createSelector(
  selectTaskState,
  (state) => state.filters
);

export const allTaskEntities = createSelector(
  selectTaskState,
  selectTaskEntities
);

export const selectTaskLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectTasksByColumnId = (columnId: number) =>
  createSelector(
    allTasks,
    (tasks) => tasks && tasks.filter((c) => c.columnId === columnId)
  );

export const selectTasksByColumnIdWithFilters = (columnId: number) =>
  createSelector(
    selectTasksByColumnId(columnId),
    taskFilters,
    (tasks, filters) => {
      if (!tasks) {
        return [];
      }

      if (!filters) {
        return tasks;
      }

      const assigneesFilter = filters.assignees;
      const descFilter = filters.desc.toLowerCase();

      return tasks
        .filter((task) =>
          assigneesFilter.length > 0
            ? assigneesFilter.includes(task.assigneeId)
            : task
        )
        .filter((task) =>
          descFilter && descFilter.length > 0
            ? task.description.toLowerCase().includes(descFilter)
            : task
        );
    }
  );

export const selectTaskById = (taskId: number) =>
  createSelector(allTaskEntities, (entities) => {
    if (entities) {
      return entities[taskId];
    }
    return null;
  });
