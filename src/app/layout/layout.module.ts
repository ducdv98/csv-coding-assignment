import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { components } from "./components";

import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [components],
  imports: [CommonModule, RouterModule, MatIconModule, MatToolbarModule],
})
export class LayoutModule {}
