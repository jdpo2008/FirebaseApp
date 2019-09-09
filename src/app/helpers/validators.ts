import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24)
];
export const NameValidation = [
  Validators.required,
  Validators.minLength(2),
  Validators.maxLength(25)
];
export const LastNameValidation = [
  Validators.required,
  Validators.minLength(2),
  Validators.maxLength(25)
];

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      // if control is empty return no error
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

export function RepeatPasswordValidator(control: AbstractControl) {
  const password = control.get("password").value;
  const passwordConfirmation = control.get("confirmpassword").value;

  if (password !== passwordConfirmation) {
    return control
      .get("confirmpassword")
      .setErrors({ passwordsNotEqual: true });
  }

  return null;
}
