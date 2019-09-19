import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Store } from "@ngrx/store";
import { IAppState } from "../store/app.reducer";
import { getIsAuthenticated } from "../store/auth/selectors/auth.selectors";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean;
  constructor(
    private authService: AuthService,
    private store: Store<IAppState>
  ) {
    this.store
      .select("auth")
      .subscribe(data => (this.isAuthenticated = data.isAuthenticated));
  }
  canActivate(): boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }
}
