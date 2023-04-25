import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TaskDetailsComponent, TasksListComponent } from "./containers";

const routes: Routes = [
  {
    path: "",
    component: TasksListComponent,
  },
  {
    path: ":id",
    component: TaskDetailsComponent,
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TaskRoutingModule {}
