/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "ng-app",
  template: `<div>
    <h2>Loan Details</h2>
    <b>Monthly Payment:</b> {{ monthly_payment | currency }} <br />
    <b>Late Payment Fee : {{ late_payment | currency }}</b> <br />
  </div>`,
})
export class Test01Component {
  loan_amount: number = 0;
  monthly_payment: number = this.loan_amount * 0.02;
  late_payment = this.monthly_payment * 0.05;
}

import { Pipe, PipeTransform } from "@angular/core";
import { formatCurrency, getCurrencySymbol } from "@angular/common";

@Pipe({
  name: "currency",
})
export class CurrencyComponent implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = "USD",
    display: "code" | "symbol" | "symbol-narrow" | string | boolean = "symbol",
    numbersInfo: string = "1.2-2",
    locale: string = "en"
  ): string | null {
    if (isNaN(Number(value)) || value === 0) {
      return "N/A";
    }
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, "wide"),
      currencyCode,
      numbersInfo
    );
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: Test01Component,
      },
    ]),
  ],
  declarations: [Test01Component, CurrencyComponent],
})
export class Test01Module {}
