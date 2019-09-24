import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap, map, tap, catchError, take } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromAuthActions from "../actions/auth.actions";
import { AuthService } from "../../../services/auth.service";
import { Observable, of } from "rxjs";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";

import { NgxSpinnerService } from "ngx-spinner";
import { GravatarService } from "../../../services/gravatar.service";
import { AlertService } from "../../../services/alert.service";
import { getErrorAuthMessage } from "../../../helpers/auth.errors";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private gravatarService: GravatarService
  ) {}

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.GET_USER),
    switchMap(() =>
      this.authService.getAuthState().pipe(
        take(1),
        map((authData: any) => {
          if (authData) {
            const user = {
              uid: authData.uid,
              displayName: authData.displayName,
              email: authData.email,
              providerId: authData.providerData[0].providerId,
              photoUrl: authData.photoURL
            };
            return new fromAuthActions.LoginSuccess({ user });
          } else {
            return new fromAuthActions.LoginFailed();
          }
        }),
        catchError(error => of(new fromAuthActions.AuthError({ error })))
      )
    )
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.LOGIN_REQUESTED),
    map((action: fromAuthActions.LoginRequested) => action.payload),
    switchMap(payload =>
      this.authService.singIn(payload).pipe(
        map(res => {
          const user = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            email: res.user.email,
            providerId: res.additionalUserInfo.providerId,
            photoUrl: res.user.photoURL,
            isNewUser: res.additionalUserInfo.isNewUser
          };
          return new fromAuthActions.LoginSuccess({ user });
        }),
        tap(data => {
          this.router.navigate(["/index"]);
          this.alertService.setAlertMessage(
            "success",
            "Bienvenido",
            data.payload.user.displayName,
            3000
          );
        }),
        catchError(error => {
          this.alertService.setAlertMessage(
            "error",
            "Ops!",
            getErrorAuthMessage(error),
            3000
          );
          return of(new fromAuthActions.AuthError({ error }));
        })
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.LOGIN_SUCCESS),
    map((action: fromAuthActions.LoginSuccess) => action.payload),
    switchMap((payload: any) => {
      return [
        new fromAuthActions.UpdateOnlineStatus({
          uid: payload.user.uid,
          status: true
        }),
        new fromAuthActions.UpdateProfile({
          displayName: payload.user.displayName,
          photoUrl: payload.user.photoUrl
        }),
        new fromAuthActions.CheckUserRole({ uid: payload.user.uid })
      ];
    })
  );

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.UPDATE_PROFILE),
    map((action: fromAuthActions.UpdateProfile) => action.payload),
    switchMap((payload: any) =>
      this.authService
        .updateProfile(payload.displayName, payload.photoUrl)
        .pipe(
          map(() => {
            const currentUser: any = this.authService.getCurrentUser();
            const updatedUser: any = {
              uid: currentUser.uid || null,
              displayName: currentUser.displayName || null,
              email: currentUser.email || null,
              providerId: currentUser.providerData[0].providerId || null,
              photoUrl: currentUser.photoURL || null
            };
            return new fromAuthActions.UpdateProfileSuccess({
              user: updatedUser
            });
          }),
          catchError(error => of(new fromAuthActions.AuthError(error)))
        )
    )
  );

  @Effect()
  socialLogin$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.SOCIAL_LOGIN),
    map((action: fromAuthActions.SocialLogin) => action.payload),
    switchMap(payload =>
      this.authService.socialLogin(payload.authProvider).pipe(
        map((res: any) => {
          const user = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            displayLastname: null,
            email: res.user.email,
            providerId: res.additionalUserInfo.providerId,
            photoUrl: res.user.photoURL,
            isNewUser: res.additionalUserInfo.isNewUser
          };
          return user;
        }),
        switchMap((user: any) => {
          if (user.isNewUser) {
            return [
              new fromAuthActions.LoginSuccess({ user }),
              new fromAuthActions.SaveUser({ user }),
              new fromAuthActions.CheckUserRole({ uid: user.uid })
            ];
          } else {
            return [
              new fromAuthActions.LoginSuccess({ user }),
              new fromAuthActions.CheckUserRole({ uid: user.uid })
            ];
          }
        }),
        tap(() => this.router.navigateByUrl("")),
        catchError(error => {
          return of(new fromAuthActions.AuthError({ error }));
        })
      )
    )
  );

  @Effect()
  logoutAction$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.LOGOUT_REQUESTED),
    map((action: fromAuthActions.LogoutRequested) => action.payload),
    switchMap((payload: any) =>
      this.authService.logout(payload).pipe(
        map(() => new fromAuthActions.LogoutCompleted()),
        tap(() => this.router.navigate(["/login"])),
        catchError(error => {
          return of(new fromAuthActions.AuthError({ error }));
        })
      )
    )
  );

  @Effect()
  registerAction$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.REGISTER_REQUESTED),
    map((action: fromAuthActions.RegisterRequested) => action.payload),
    switchMap(payload =>
      this.authService.register(payload, payload.password).pipe(
        map((res: any) => {
          // const gravatarUrl = this.gravatarService.getUserGravatar(
          //   res.user.email
          // );
          const user = {
            uid: res.user.uid,
            displayName: payload.displayName || res.user.displayName,
            displayLastName: payload.displayLastName,
            email: res.user.email,
            providerId: res.additionalUserInfo.providerId,
            photoUrl: res.user.photoURL,
            isNewUser: res.additionalUserInfo.isNewUser,
            isAdmin: false,
            isOnline: true
          };
          return user;
        }),
        switchMap((user: any) => {
          console.log(user);
          return [
            new fromAuthActions.RegisterCompleted(),
            new fromAuthActions.LoginSuccess({ user }),
            new fromAuthActions.UpdateProfile({
              displayName: payload.displayName,
              photoUrl: user.photoUrl
            }),
            new fromAuthActions.SaveUser({ user })
          ];
        }),
        tap(data => {
          this.router.navigate(["/index"]);
          console.log(data);
        }),
        catchError(error => of(new fromAuthActions.AuthError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  saveUser$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.SAVE_USER),
    map((action: fromAuthActions.SaveUser) => action.payload),
    switchMap((payload: any) => this.authService.saveUser(payload.user)),
    catchError(error => of(new fromAuthActions.AuthError({ error })))
  );

  @Effect({ dispatch: false })
  updateOnlineStatus$ = this.actions$.pipe(
    ofType(fromAuthActions.EAuthAction.UPDATE_ONLINE_STATUS),
    map((action: fromAuthActions.UpdateOnlineStatus) => action.payload)
    // switchMap((payload: any) =>
    //   // this.authService.updateOnlineStatus(payload.uid, payload.status)
    // )
  );
}
