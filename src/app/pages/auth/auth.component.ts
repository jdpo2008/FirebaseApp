import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../store/app.reducer";
import { selectIsLoading } from "../../store/auth/selectors/auth.selectors";
import * as authActions from "../../store/auth/actions/auth.actions";
import { ICredentials } from "src/app/interfaces/auth.interface";
import { Observable } from "rxjs/Observable";
import { User } from "../../interfaces/auth.interface";
import "rxjs/add/operator/map";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FacebookLogin,
  TwitterkLogin
} from "../../store/auth/actions/auth.actions";

export const EMAIL_REGEX = new RegExp(
  [
    '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
    "[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+",
    "[a-zA-Z]{2,}))$"
  ].join("")
);

export const PHONE_NUMBER_REGEX = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public registerFormGroup: FormGroup;
  public resetPasswordFormGroup: FormGroup;
  public submited: boolean;
  public isLoading: boolean;

  user$: Observable<User>;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private spinner: NgxSpinnerService
  ) {
    this.submited = false;
    this.registerProviderIcons();
    this.loginFormInit();
    this.registerFormInit();
  }

  ngOnInit() {
    this.user$ = this.store.select("user");
    this.store.dispatch(new authActions.GetUser());
  }

  public onLogin() {
    const credenials: ICredentials = {
      email: this.loginFormGroup.controls.email.value,
      password: this.loginFormGroup.controls.password.value
    };
    this.submited = true;
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
    if (this.registerFormGroup.invalid) {
      return;
    }
  }

  public onStrengthChanged(strength: number) {
    console.log("password strength = ", strength);
  }

  public getEmailErrorMessage() {
    return this.loginFormGroup.controls.email.hasError("required")
      ? "El Email es Requerido"
      : this.loginFormGroup.controls.email.hasError("email")
      ? "No es un Email valido"
      : "";
  }

  public getPasswordErrorMessage() {
    return this.loginFormGroup.controls.password.hasError("required")
      ? "El Password es Requerido"
      : this.loginFormGroup.controls.password.hasError("minlength")
      ? "La contraseña debe tener mas de 8 caracteres"
      : this.loginFormGroup.controls.password.hasError("maxlength")
      ? "La contraseña debe tener menos de 15 caracteres"
      : "";
  }

  public loginFormInit() {
    this.loginFormGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(15)]
      ],
      recordarme: [false]
    });
  }

  public registerFormInit() {
    this.registerFormGroup = this.fb.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(15)]
      ],
      confirmpassword: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(15)]
      ]
    });
  }

  public registerProviderIcons() {
    this.iconRegistry
      .addSvgIcon(
        "google",
        this.sanitizer.bypassSecurityTrustResourceUrl(
          "../../../assets/images/svg/google-icon.svg"
        )
      )
      .addSvgIcon(
        "facebook",
        this.sanitizer.bypassSecurityTrustResourceUrl(
          "../../../assets/images/svg/facebook.svg"
        )
      )
      .addSvgIcon(
        "twitter",
        this.sanitizer.bypassSecurityTrustResourceUrl(
          "../../../assets/images/svg/twitter.svg"
        )
      );
  }
}
