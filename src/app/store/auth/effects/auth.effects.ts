import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromAuthActions from "../actions/auth.actions";
import { AuthService } from "../../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../../../interfaces/auth.interface";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";

import { NgxSpinnerService } from "ngx-spinner";
import { FACEBOOK_LOGIN, FacebookLogin } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  @Effect()
  getUser: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAuthActions.GET_USER),
      map((action: fromAuthActions.GetUser) => action.payload),
      switchMap(payload => this.afAuth.authState),
      map(authData => {
        if (authData) {
          /// User logged in
          this.spinner.hide();
          const user = new User(authData.uid, authData.displayName);
          this.router.navigate(["/index"]);
          return new fromAuthActions.Authenticated(user);
        } else {
          /// User not logged in
          this.router.navigate(["/login"]);
          return new fromAuthActions.NotAuthenticated();
        }
      })
    )
    .catch(err => Observable.of(new fromAuthActions.AuthError()));

  @Effect()
  login: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAuthActions.EMAIL_PASSWORD_LOGIN),
      map((action: fromAuthActions.EmailLogin) => action.payload),
      switchMap(payload => {
        return Observable.fromPromise(
          this.authService.singIn(payload.email, payload.password)
          // this.singIn(payload.email, payload.password)
        );
      }),
      map(credential => {
        return new fromAuthActions.GetUser();
      })
    )
    .catch(err => {
      return Observable.of(
        new fromAuthActions.AuthError({ error: err.message })
      );
    });

  @Effect()
  loginGoogle: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAuthActions.GOOGLE_LOGIN),
      map((action: fromAuthActions.GoogleLogin) => action.payload),
      switchMap(payload => {
        return Observable.fromPromise(this.authService.onGoogleLogin());
      }),
      map(credential => {
        return new fromAuthActions.GetUser();
      })
    )
    .catch(err => {
      return Observable.of(
        new fromAuthActions.AuthError({ error: err.message })
      );
    });

  @Effect()
  loginFacebook: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAuthActions.FACEBOOK_LOGIN),
      map((action: fromAuthActions.FacebookLogin) => action.payload),
      switchMap(payload => {
        return Observable.fromPromise(this.authService.onFacebookLogin());
      }),
      map(credential => {
        return new fromAuthActions.GetUser();
      })
    )
    .catch(err => {
      return Observable.of(
        new fromAuthActions.AuthError({ error: err.message })
      );
    });

  @Effect()
  loginTwitter: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAuthActions.TWITTER_LOGIN),
      map((action: fromAuthActions.TwitterkLogin) => action.payload),
      switchMap(payload => {
        return Observable.fromPromise(this.authService.onTwitterLogin());
      }),
      map(credential => {
        return new fromAuthActions.GetUser();
      })
    )
    .catch(err => {
      return Observable.of(
        new fromAuthActions.AuthError({ error: err.message })
      );
    });

  @Effect()
  logout: Observable<Action> = this.actions$
    .pipe(
      ofType(fromAuthActions.LOGOUT),
      map((action: fromAuthActions.Logout) => action.payload),
      switchMap(payload => {
        return Observable.of(this.authService.logOut());
      }),
      map(authData => {
        return new fromAuthActions.NotAuthenticated();
      })
    )
    .catch(err =>
      Observable.of(new fromAuthActions.AuthError({ error: err.message }))
    );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
}
