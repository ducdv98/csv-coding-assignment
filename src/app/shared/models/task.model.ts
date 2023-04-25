type User = {
  id: number;
  name: string;
};

type Task = {
  id: number;
  description?: string;
  assigneeId?: number;
  columnId?: number;
  createdDate?: string;
};

type TaskColumn = {
  id: number;
  name: string;
};

type TaskFilter = {
  assignees: Array<number>;
  desc: string;
};

export { User, Task, TaskColumn, TaskFilter };
