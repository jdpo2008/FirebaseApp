import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { User } from "firebase/app";
import * as authActions from "../../../store/auth/actions/auth.actions";
import { IAppState } from "../../../store/app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  usuario: User | null;
  constructor(
    private store: Store<IAppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.usuario;
  }

  public toggleBars() {
    alert("Mensaje desde el header");
  }

  public logOut() {
    this.store.dispatch(new authActions.Logout());
  }
}
