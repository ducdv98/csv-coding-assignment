import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "@layout/components";

const routes: Routes = [
  {
    path: "tasks",
    component: LayoutComponent,
    loadChildren: () =>
      import("./modules/task/task.module").then((m) => m.TaskModule),
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "tasks",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
