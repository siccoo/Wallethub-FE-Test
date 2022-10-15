/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "ng-app",
  template: `
    <h2>Enter your first and last name</h2>
    <div>
      <label>First Name: </label>
      <input
        type="text"
        (change)="onChangeFunc($event)"
        [value]="firstName"
        name="firstName"
      />
      <br />
      <label>Last Name: </label>
      <input
        type="text"
        (change)="onChangeFunc($event)"
        [value]="lastName"
        name="lastName"
      />
      <p>{{ userName }}</p>
    </div>
  `,
  styles: [],
})
export class UserNameComponent {
  userName = "Enter first name and last name to generate username";
  firstName = "";
  lastName = "";

  onChangeFunc(event: any) {
    this[event.target.name] = event.target.value;
    console.log(event.target.value);

    this.addUserName();
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addUserName() {
    if (this.firstName && this.lastName) {
      this.userName = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${this.randomInteger(
        2,
        8
      )}`;
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: UserNameComponent,
      },
    ]),
  ],
  declarations: [UserNameComponent],
})
export class UserNameModule {}
