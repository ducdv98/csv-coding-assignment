import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CoreModule } from "@app/core/core.module";
import { HotToastModule } from "@ngneat/hot-toast";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    MatToolbarModule,
    HotToastModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
