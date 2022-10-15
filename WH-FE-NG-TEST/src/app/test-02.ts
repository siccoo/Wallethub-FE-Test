/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "textfield",
  template:
    '<input type="text" (input)="onChangeFunc($event)" [value]="field" />',
})
export class TextField {
  constructor(private evtService: EventService) {}
  field = "";
  onChangeFunc(e: any) {
    this.field = e.target.value;
    this.evtService.emitChildEvent(this.field);
  }
}

@Component({
  selector: "child-component",
  template: `<h2>
    Title:
    <h2><br /><textfield></textfield></h2>
  </h2>`,
})
export class ChildComponent {}

@Component({
  selector: "ng-app",
  template: `<div>
    <child-component></child-component> <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  constructor(private evtService: EventService) {}
  title: string = "";
  ngOnInit() {
    this.evtService.childEventListener().subscribe((info) => {
      this.title = info;
    });
  }
}

export class EventService {
  private childClickedEvent = new BehaviorSubject<string>("");

  emitChildEvent(message: string) {
    this.childClickedEvent.next(message);
  }

  childEventListener() {
    return this.childClickedEvent.asObservable();
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test02Component,
      },
    ]),
  ],
  providers: [EventService],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
