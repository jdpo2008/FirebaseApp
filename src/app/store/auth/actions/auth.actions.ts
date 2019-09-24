import { Action } from "@ngrx/store";
import {
  ICredentials,
  User,
  AuthProviders
} from "../../../interfaces/auth.interface";
import { Usuario } from "../../../services/auth.service";
import { FirebaseError } from "firebase";

export enum EAuthAction {
  REGISTER_REQUESTED = "[Auth] REGISTER Requested",
  REGISTER_COMPLETED = "[Auth] REGISTER Completed",
  REGISTER_FAILED = "[Auth] REGISTER Failed",

  UPDATE_PROFILE = "[Auth] Update profile",
  UPDATE_PROFILE_SUCCESS = "[Auth] Update profile success",

  LOGIN_REQUESTED = "[Auth] LOGIN Requested",
  LOGIN_SUCCESS = "[Auth] LOGIN Success",
  LOGIN_FAILED = "[Auth] LOGIN Failed",

  SOCIAL_LOGIN = "[Auth] Social media login",

  LOGOUT_REQUESTED = "[Auth] LOGOUT requested",
  LOGOUT_COMPLETED = "[Auth] LOGOUT completed",

  SAVE_USER = "[Auth] Save user",
  UPDATE_ONLINE_STATUS = "[Auth] Update online status",

  CHECK_USER_ROLE = "[Auth] Check user role",
  UPDATE_USER_ROLE = "[Auth] Update user role",

  GET_USER = "[Auth] GET User",

  AUTH_ERROR = "[Auth] Error"
}

export class RegisterRequested implements Action {
  readonly type = EAuthAction.REGISTER_REQUESTED;

  constructor(public payload: Usuario) {}
}

export class RegisterCompleted implements Action {
  readonly type = EAuthAction.REGISTER_COMPLETED;
}

export class RegisterFailed implements Action {
  readonly type = EAuthAction.REGISTER_FAILED;

  constructor(public payload: { error: any }) {}
}

export class UpdateProfile implements Action {
  readonly type = EAuthAction.UPDATE_PROFILE;

  constructor(public payload: { displayName: string; photoUrl: string }) {}
}

export class UpdateProfileSuccess implements Action {
  readonly type = EAuthAction.UPDATE_PROFILE_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class LoginRequested implements Action {
  readonly type = EAuthAction.LOGIN_REQUESTED;

  constructor(public payload: ICredentials) {}
}

export class LoginSuccess implements Action {
  readonly type = EAuthAction.LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class LoginFailed implements Action {
  readonly type = EAuthAction.LOGIN_FAILED;
}

export class SocialLogin implements Action {
  readonly type = EAuthAction.SOCIAL_LOGIN;

  constructor(public payload: { authProvider: string }) {}
}

export class LogoutRequested implements Action {
  readonly type = EAuthAction.LOGOUT_REQUESTED;

  constructor(public payload: string) {}
}

export class LogoutCompleted implements Action {
  readonly type = EAuthAction.LOGOUT_COMPLETED;
}

export class SaveUser implements Action {
  readonly type = EAuthAction.SAVE_USER;

  constructor(public payload: { user: Usuario }) {}
}

export class UpdateOnlineStatus implements Action {
  readonly type = EAuthAction.UPDATE_ONLINE_STATUS;

  constructor(public payload: { uid: string; status: boolean }) {}
}

export class CheckUserRole implements Action {
  readonly type = EAuthAction.CHECK_USER_ROLE;

  constructor(public payload: { uid: string }) {}
}

export class UpdateUserRole implements Action {
  readonly type = EAuthAction.UPDATE_USER_ROLE;

  constructor(public payload: { isAdmin: boolean }) {}
}

export class GetUser implements Action {
  readonly type = EAuthAction.GET_USER;
}

export class AuthError implements Action {
  readonly type = EAuthAction.AUTH_ERROR;

  constructor(public payload: { error: FirebaseError }) {}
}

export type AuthActionTypes =
  | RegisterRequested
  | RegisterCompleted
  | RegisterFailed
  | UpdateProfile
  | UpdateProfileSuccess
  | LoginRequested
  | LoginSuccess
  | LoginFailed
  | SocialLogin
  | LogoutRequested
  | LogoutCompleted
  | SaveUser
  | UpdateOnlineStatus
  | CheckUserRole
  | UpdateUserRole
  | GetUser
  | AuthError;
