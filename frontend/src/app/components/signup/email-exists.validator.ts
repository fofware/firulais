import { UsersService } from 'src/app/services/users.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

export function userEmailExistsValidator(user: UsersService):AsyncValidatorFn  {
    return (control: AbstractControl) => {
        return user.findUserByEmail(control.value)
    }
}


export function existingEmailNumberValidator(userService: AuthService): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<Promise<ValidationErrors | null> | Observable<ValidationErrors | null>> => {
    return (await userService.emailFind(control.value)).map(
      users => {
        console.log(users);
        return (users && users.length > 0) ? {"eMailExists": true} : null;
      }
    );
  };
}
