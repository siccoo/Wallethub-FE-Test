//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-02.js
 * 
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";


https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
        data += chunk;
    });
    resp.on("end", () => {
        // to String will work, but there would be a space after the word
        const hobbies = JSON.parse(data).hobbies.join(", ");
        console.log(hobbies);
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
})