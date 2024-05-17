import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (
  controlName: AbstractControl
): ValidationErrors | null => {
  let password = controlName.get('password');
  let confirmPassword = controlName.get('confirmPassword');
  if (
    password &&
    confirmPassword &&
    password?.value !== confirmPassword?.value
  ) {
    return { passwordMismatch: true };
  }

  return null;
};
