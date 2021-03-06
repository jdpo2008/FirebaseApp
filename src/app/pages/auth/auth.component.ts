import { Component, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../store/app.reducer";
import * as authActions from "../../store/auth/actions/auth.actions";
import { ICredentials } from "src/app/interfaces/auth.interface";
import "rxjs/add/operator/map";
import { Usuario } from "../../services/auth.service";
import { MatTabChangeEvent } from "@angular/material";
import { AuthAnimations } from "../../animations/index";
import { AuthProviders } from "../../interfaces/auth.interface";
import { getError } from "../../store/auth/selectors/auth.selectors";
import * as CryptoJS from "crypto-js";
import {
  NameValidation,
  LastNameValidation,
  EmailValidation,
  PasswordValidation,
  RepeatPasswordValidator
} from "../../helpers/validators";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getErrorAuthMessage } from "../../helpers/auth.errors";

export const PHONE_NUMBER_REGEX = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
  animations: [AuthAnimations]
})
export class AuthComponent implements OnInit, OnDestroy {
  public loginFormGroup: FormGroup;
  public registerFormGroup: FormGroup;
  public resetPasswordFormGroup: FormGroup;
  public recordarme = false;
  public submited: boolean;
  public isLoading: boolean;
  public passwordResetWished = false;
  public tabIndex: number;
  public selectedTabChange: EventEmitter<
    MatTabChangeEvent
  > = new EventEmitter();
  public providers: AuthProviders;
  error$: Observable<string | null>;
  ErrorCode: string;
  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
    this.submited = false;
    this.loginFormInit();
    this.registerFormInit();
    this.resetPasswordFormInit();
  }

  ngOnInit() {
    this.store
      .select("auth")
      .subscribe(data => (this.isLoading = data.isLoading));

    // this.store.dispatch(new authActions.GetUser());
    this.error$ = this.store.pipe(
      select(getError),
      map((error: any) => {
        if (error) {
          console.log(error);
          return error.code;
        } else {
          return null;
        }
      })
    );
  }

  ngOnDestroy() {
    this.store
      .select("auth")
      .subscribe()
      .unsubscribe();
  }

  onLogin() {
    const credenials: ICredentials = {
      email: this.loginFormGroup.controls.email.value,
      password: this.loginFormGroup.controls.password.value
    };
    this.submited = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.store.dispatch(new authActions.LoginRequested(credenials));
  }

  onGoogleLogin(authProvider: string) {
    this.store.dispatch(new authActions.SocialLogin({ authProvider }));
  }

  onFacebookLogin(authProvider: string) {
    this.store.dispatch(new authActions.SocialLogin({ authProvider }));
  }

  onTwitterLogin(authProvider: string) {
    this.store.dispatch(new authActions.SocialLogin({ authProvider }));
  }

  onRegister() {
    this.submited = true;
    if (this.registerFormGroup.invalid) {
      return;
    }
    const user = new Usuario(
      this.registerFormGroup.controls.nombre.value,
      this.registerFormGroup.controls.apellido.value,
      this.registerFormGroup.controls.email.value,
      false,
      null,
      null,
      null,
      null,
      CryptoJS.AES.encrypt(this.registerFormGroup.controls.password.value)
    );
    this.store.dispatch(new authActions.RegisterRequested(user));
  }

  private onStrengthChanged(strength: number) {
    console.log("password strength = ", strength);
  }

  private getLoginEmailErrorMessage() {
    return this.loginFormGroup.controls.email.hasError("required")
      ? "El Email es Requerido"
      : this.loginFormGroup.controls.email.hasError("email")
      ? "No es un Email valido"
      : "";
  }

  private getLoginPasswordErrorMessage() {
    return this.registerFormGroup.controls.password.hasError("required")
      ? "El Password es Requerido"
      : this.registerFormGroup.controls.password.hasError("minlength")
      ? "La contraseña debe tener mas de 8 caracteres"
      : this.registerFormGroup.controls.password.hasError("maxlength")
      ? "La contraseña debe tener menos de 15 caracteres"
      : "";
  }

  private getRegisterNameErrorMessage() {
    return this.registerFormGroup.controls.nombre.hasError("required")
      ? "El Nombre es Requerido"
      : this.registerFormGroup.controls.nombre.hasError("minlength")
      ? "Debe tener mas de 2 caracteres"
      : this.registerFormGroup.controls.nombre.hasError("maxlength")
      ? "Debe tener menos de 25 caracteres"
      : "";
  }

  private getRegisterLastNameErrorMessage() {
    return this.registerFormGroup.controls.apellido.hasError("required")
      ? "El Apellido es Requerido"
      : this.registerFormGroup.controls.apellido.hasError("minlength")
      ? "Debe tener mas de 2 caracteres"
      : this.registerFormGroup.controls.apellido.hasError("maxlength")
      ? "Debe tener menos de 25 caracteres"
      : "";
  }

  private getRegisterEmailErrorMessage() {
    return this.registerFormGroup.controls.email.hasError("required")
      ? "El Email es Requerido"
      : this.registerFormGroup.controls.email.hasError("email")
      ? "No es un Email valido"
      : "";
  }

  private getRegisterPasswordErrorMessage() {
    return this.loginFormGroup.controls.password.hasError("required")
      ? "El Password es Requerido"
      : this.loginFormGroup.controls.password.hasError("minlength")
      ? "La contraseña debe tener mas de 8 caracteres"
      : this.loginFormGroup.controls.password.hasError("maxlength")
      ? "La contraseña debe tener menos de 15 caracteres"
      : "";
  }

  private loginFormInit() {
    this.loginFormGroup = this.fb.group({
      email: [null, EmailValidation],
      password: [null, PasswordValidation]
    });
  }

  private registerFormInit() {
    this.registerFormGroup = this.fb.group(
      {
        nombre: [null, NameValidation],
        apellido: [null, LastNameValidation],
        email: [null, EmailValidation],
        password: [null, PasswordValidation],
        confirmpassword: [null]
      },
      { validator: RepeatPasswordValidator }
    );
  }

  private resetPasswordFormInit() {
    this.resetPasswordFormGroup = this.fb.group({
      email: [null, EmailValidation]
    });
  }

  private onTabChange(event: MatTabChangeEvent) {
    if (event.index !== 2) {
      this.passwordResetWished = false;
    }
    this.selectedTabChange.emit(event);
    this.tabIndex = event.index;
  }

  private createForgotPasswordTab() {
    this.submited = false;
    this.passwordResetWished = true;
    this.tabIndex = 2;
  }
}
