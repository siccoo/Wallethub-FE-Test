/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "ng-app",
  template: `<form>
    <h2>Login</h2>
    <br />
    <input
      (input)="onChangeFunc($event)"
      type="email"
      [value]="email"
      name="email"
    />
    <p>
        <small style="color: #ff0000">{{ solution.email.message }}</small>
    </p>
    <br />
    <input
      (input)="onChangeFunc($event)"
      type="password"
      [value]="password"
      name="password"
    />
    <p>
        <small style="color: #ff0000">{{ solution.password.message }}</small>
    </p>
    <button (click)="handleSubmit($event)" type="submit">Submit</button>
    <br /><br />
    <div *ngIf="logged_in">Logged In!</div>
  </form>`,
})
export class Test03Component {
  solution = {
    email: {
      message: "",
      validate: function (email: string) {
        const isValid = email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return { isValid, message: isValid ? "" : "Email is invalid" };
      },
    },
    password: {
      message: "",
      validate: function (password: string) {
        let message;
        let isValid = false;

        if (!password) {
          message = "Please fill password";
          return { message, isValid };
        }

        if (password.length < 8) {
          message = "Password length must be 8 characters at least";
          return { message, isValid };
        }

        if (!password.match(/(?=.*\W)/)) {
          message = "Password must contain at least one special character";
          return { message, isValid };
        }

        if (!password.match(/(?=.*[a-z])/)) {
          message = "Password must contain at least one lowercase character";
          return { message, isValid };
        }

        if (!password.match(/(?=.*[A-Z])/)) {
          message = "Password must contain at least one uppercase character";
          return { message, isValid };
        }

        if (!password.match(/(?=.*\d)/)) {
          message = "Password must contain at least one number";
          return { message, isValid };
        }

        return { isValid: true, message };
      },
    },
  };

  onChangeFunc(event) {
    this[event.target.value] = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();

    let isValid = true;
    ["email", "password"].forEach((key) => {
      const options = this.solution[key];
      const totalSolution = options.validate(this[key]);
      options.message = totalSolution.message;
      isValid = isValid && totalSolution.isValid;
    });

    if (isValid) {
      this.logged_in = true;
    }
  }

  email: string = "";
  password: string = "";

  logged_in = false;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test03Component,
      },
    ]),
  ],
  declarations: [Test03Component],
})
export class Test03Module {}
