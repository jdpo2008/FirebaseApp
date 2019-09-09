import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../store/app.reducer";
import * as authActions from "../../store/auth/actions/auth.actions";
import { AuthService } from "../../services/auth.service";
import { User } from "firebase/app";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  usuario: User | null;
  constructor(
    private store: Store<IAppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.usuario;
  }
  ngAfterViewInit(): void {}
}
