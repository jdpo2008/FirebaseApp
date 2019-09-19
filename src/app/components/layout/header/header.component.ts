import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { IAppState } from "../../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as authActions from "../../../store/auth/actions/auth.actions";
import { User, IUser } from "../../../interfaces/auth.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  usuario: User;
  opened: boolean;
  constructor(
    private store: Store<IAppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.store.select("auth").subscribe(data => (this.usuario = data.user));
  }

  public toggleBars() {
    // this.opened = true;
    // jQuery("#sidebar").toggleClass("merge-left");
  }

  public logOut() {
    this.store.dispatch(new authActions.LogoutRequested(this.usuario.uid));
  }
}
