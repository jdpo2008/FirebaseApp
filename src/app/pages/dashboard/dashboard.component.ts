import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../store/app.reducer";
import * as authActions from "../../store/auth/actions/auth.actions";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {}
  public logOut() {
    this.store.dispatch(new authActions.Logout());
  }
}
