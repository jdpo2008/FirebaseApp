import { Component, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../store/app.reducer";
import * as authActions from "../../store/auth/actions/auth.actions";
import { ICredentials } from "src/app/interfaces/auth.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { NgxSpinnerService } from "ngx-spinner";
import { Usuario, AuthService } from "../../services/auth.service";
import { IAuthState } from "src/app/store/auth/state/auth.state";
import { MatTabChangeEvent } from "@angular/material";
import { AuthAnimations } from "../../animations/index";
import { SingUp } from "../../store/auth/actions/auth.actions";
import {
  NameValidation,
  LastNameValidation,
  EmailValidation,
  PasswordValidation,
  RepeatPasswordValidator
} from "../../helpers/validators";

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
  user$: Observable<IAuthState>;
  public selectedTabChange: EventEmitter<
    MatTabChangeEvent
  > = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {
    this.submited = false;
    this.loginFormInit();
    this.registerFormInit();
    this.resetPasswordFormInit();
  }

  ngOnInit() {
    // this.store.select("auth").subscribe(data => console.log(data.user));
    this.store.dispatch(new authActions.GetUser());
    console.log(this.authService.authenticated);
  }

  ngOnDestroy() {}

  public onLogin() {
    const credenials: ICredentials = {
      email: this.loginFormGroup.controls.email.value,
      password: this.loginFormGroup.controls.password.value
    };
    this.submited = true;
    // this.store
    //   .select("auth")
    //   .subscribe(auth => (this.isLoading = auth.loading));
    // this.store
    //   .pipe(select(selectIsLoading))
    //   .subscribe(val => (this.isLoading = val));
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.spinner.show();
    this.store.dispatch(new authActions.EmailLogin(credenials));
  }

  onGoogleLogin() {
    this.store.dispatch(new authActions.GoogleLogin());
  }

  onFacebookLogin() {
    this.store.dispatch(new authActions.FacebookLogin());
  }

  onTwitterLogin() {
    this.store.dispatch(new authActions.TwitterkLogin());
  }

  public onRegister() {
    this.submited = true;
    this.spinner.show();
    if (this.registerFormGroup.invalid) {
      this.spinner.hide();
      console.log(this.registerFormGroup);
      return;
    }
    const user = new Usuario(
      this.registerFormGroup.controls.nombre.value,
      this.registerFormGroup.controls.apellido.value,
      this.registerFormGroup.controls.email.value,
      null,
      null,
      null,
      null,
      this.registerFormGroup.controls.password.value
    );

    this.store.dispatch(new authActions.SingUp(user));
    // this.authService.singUp(
    //   user,
    //   this.registerFormGroup.controls.password.value
    // );
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
