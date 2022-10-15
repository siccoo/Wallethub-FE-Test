/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "ng-app",
  template: `
    <h2>User Review:</h2>
    <textarea
      (input)="onChangeFunc($event)"
      class="textfield"
      placeholder="Write your Review"
      [value]="review_input"
    ></textarea>
    <br /><br />
    <h3>Output:</h3>
    <div class="output" [innerHTML]="review_content"></div>
  `,
  styles: [
    `
      .textfield {
        width: 600px;
        height: 220px;
        padding: 10px;
        box-sizing: border-box;
      }
    `,
    `
      .output {
        max-width: 100%;
        width: 600px;
        border: solid 1px #f9f6f6;
        padding: 5px;
        background: #ecebeb;
        white-space: pre-wrap;
      }
    `,
  ],
})
export class ReviewComponent {
  // sample input
  review_input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec. 

Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
          1) Nulla et tempus orci
          2) Integer semper porttitor faucibus
          
At https://wallethub.com <b>bolded text</b>`;

  review_content = "";

  onChangeFunc(e) {
    this.review_content = this.cleanHtml(e.target.value);
  }

  /**
   * Wraps link in an anchor tag
   * @param inputText
   * @returns string
   */
  linkElements(inputText) {
    let returnText, returnPatternOne, returnPatternTwo, returnPatternThree;

    //URLs starting with http:// or https://
    returnPatternOne =
      /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    returnText = inputText.replace(
      returnPatternOne,
      '<a href="$1" target="_blank">$1</a>'
    );

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    returnPatternTwo = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    returnText = returnText.replace(
      returnPatternTwo,
      '$1<a href="http://$2" target="_blank">$2</a>'
    );

    //Change email addresses to mailto:: links.
    returnPatternThree =
      /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    returnText = returnText.replace(
      returnPatternThree,
      '<a href="mailto:$1">$1</a>'
    );

    return returnText;
  }

  /**
   * Strips html tags off string. removes style and script content completely
   * @param {string} rawString
   * @returns string
   */
  cleanHtml = (rawString) => {
    let cleanedString = rawString.replace(
      /<script([\S\s]*?)>([\S\s]*?)<\/script>/gi,
      ""
    );
    cleanedString = cleanedString.replace(
      /<style([\S\s]*?)>([\S\s]*?)<\/style>/gi,
      ""
    );
    cleanedString = cleanedString.replace(/<(?:.|\s)*?>/gi, "");
    return this.linkElements(cleanedString);
  };

  ngOnInit() {
    this.review_content = this.cleanHtml(this.review_input);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: ReviewComponent,
      },
    ]),
  ],
  declarations: [ReviewComponent],
})
export class ReviewModule {}
