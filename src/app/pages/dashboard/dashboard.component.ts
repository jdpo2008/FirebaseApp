import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../store/app.reducer";
import { AuthService } from "../../services/auth.service";
import { User } from "firebase/app";
import { Observable } from "rxjs/internal/Observable";
import {
  getIsLoading,
  getIsAuthenticated
} from "../../store/auth/selectors/auth.selectors";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  usuario: User | null;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  @Input() opened: boolean;
  constructor(
    private store: Store<IAppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.isLoggedIn$ = this.store.select(getIsAuthenticated);
    this.isLoading$ = this.store.select(getIsLoading);
  }
  ngAfterViewInit(): void {
    this.isLoggedIn$.subscribe(data => console.log(data));
  }
}
