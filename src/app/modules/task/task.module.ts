import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskRoutingModule } from "./task-routing.module";
import { containers } from "./containers";
import { components } from "./components";
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { LoadingModule } from "@shared/components/loading/loading.module";

@NgModule({
  declarations: [components, containers],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatIconModule,
    DragDropModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
    LoadingModule,
  ],
})
export class TaskModule {}
