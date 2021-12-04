import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['Christ', 'Anna'];

  signUpForm!: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenName.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail.call(this)
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // Observe Value Changes
    // this.signUpForm.valueChanges.subscribe((value) => console.log(value));

    // Observe Status Changes
    // this.signUpForm.statusChanges.subscribe((status) => console.log(status));
    this.signUpForm.setValue({
      userData: {
        username: 'Toan',
        email: 'toan@test.com',
      },
      gender: 'male',
      hobbies: [],
    });

    this.signUpForm.patchValue({
      userData: {
        username: 'Anna',
      },
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  forbiddenName(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmail(): AsyncValidatorFn {
    return (control: AbstractControl) =>
      new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({ emailIsForbidden: true });
          } else {
            resolve(null);
          }
        }, 1500);
      });
  }
  //   forbiddenEmail(control: FormControl): Observable<any> | Promise<any> | null {
  //     return new Promise<any>((resolve, reject) => {
  //       setTimeout(() => {
  //         if (control.value === 'test@test.com') {
  //           resolve({ emailIsForbidden: true });
  //         } else {
  //           resolve(null);
  //         }
  //       }, 1500);
  //     });
  //   }
}
