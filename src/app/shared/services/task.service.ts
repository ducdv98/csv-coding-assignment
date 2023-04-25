import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";
import { Task, TaskColumn, User } from "../models/task.model";

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable({
  providedIn: "root",
})
export class TaskService {
  storedTasks: Task[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      columnId: 123,
      createdDate: new Date().toISOString(),
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      columnId: 456,
      createdDate: new Date().toISOString(),
    },
    {
      id: 2,
      description: "Clean the house",
      assigneeId: 222,
      columnId: 123,
      createdDate: new Date(2023, 3, 16).toISOString(),
    },
    {
      id: 3,
      description: "Go to the cinema",
      assigneeId: 444,
      columnId: 123,
      createdDate: new Date(2023, 3, 17).toISOString(),
    },
    {
      id: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pretium a leo sed tincidunt",
      assigneeId: 222,
      columnId: 123,
      createdDate: new Date(2023, 4, 17).toISOString(),
    },
    {
      id: 5,
      description:
        "Aenean fermentum, mi ac mattis vestibulum, sem ligula pellentesque justo, et bibendum eros est id nisl. Integer aliquet id metus quis fermentum",
      assigneeId: 333,
      columnId: 456,
      createdDate: new Date(2023, 0, 30).toISOString(),
    },
    {
      id: 6,
      description: "Sed sit amet ipsum at enim finibus mollis",
      assigneeId: 333,
      columnId: 456,
      createdDate: new Date(2023, 1, 9).toISOString(),
    },
    {
      id: 7,
      description: "Nunc quis est auctor est tempor finibus in ac tortor",
      assigneeId: 111,
      columnId: 123,
      createdDate: new Date(2023, 2, 19).toISOString(),
    },
  ];

  storedUsers: User[] = [
    { id: 111, name: "Mike" },
    { id: 222, name: "James" },
    { id: 333, name: "John" },
    { id: 444, name: "Kris" },
    { id: 555, name: "David" },
  ];

  storedColumns: TaskColumn[] = [
    {
      id: 123,
      name: "To do",
    },
    {
      id: 456,
      name: "Done",
    },
  ];

  lastId = 2;

  private findTaskById = (id) =>
    this.storedTasks.find((task) => task.id === +id);

  private findUserById = (id) =>
    this.storedUsers.find((user) => user.id === +id);

  tasks() {
    return of(this.storedTasks).pipe(delay(randomDelay()));
  }

  task(id: number): Observable<Task> {
    return of(this.findTaskById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  columns() {
    return of(this.storedColumns).pipe(delay(randomDelay()));
  }

  newTask(task: Task) {
    const newTask: Task = {
      ...task,
      id: ++this.lastId,
      columnId: 123,
      createdDate: new Date().toISOString(),
    };

    this.storedTasks = this.storedTasks.concat(newTask);

    return of(newTask).pipe(delay(randomDelay()));
  }

  update(taskId: number, updates: Partial<Omit<Task, "id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    this.storedTasks = this.storedTasks.map((t) =>
      t.id === taskId ? updatedTask : t
    );

    return of(updatedTask).pipe(delay(randomDelay()));
  }
}
