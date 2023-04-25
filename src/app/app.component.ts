import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "@app/core/store";
import { getUsers } from "@app/core/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private store: Store<fromStore.AppState>) {
    this.store.dispatch(getUsers());
  }
}
