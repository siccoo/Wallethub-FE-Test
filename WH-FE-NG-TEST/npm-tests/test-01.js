//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 * 
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>m ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from "fs-extra";
import { fastify } from "fastify";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const data = {
    error: false,
    users: [
        "John Doe",
        "Lucita Esau",
        "Thomas Friedman",
        "Norma Helms",
        "Amy Manning"
    ],
};

// write the json saving code here
const filedPath = `${__dirname}/test-01.json`;
await fs.writeFile(filedPath, JSON.stringify(data));


const app = fastify({
    ignoreTrailingSlash: true,
    keepAliveTimeout: 65 * 1000
});

app.get('/', (request, reply) => {
    reply.header('Content-Type', 'text/html; charset=utf-8');
    // read the json here and insert the list names into the html
    const dataFromFile = fs.readFileSync(filedPath, "utf-8");
    const users = JSON.parse(dataFromFile).users;
    const page =
        `<html>
            <head>
                <title>Wallethub Test</title>
            </head>
            <body>
            ${users.map((user) => `<p>${user}</p>`).join("")}
            </body>
        </html>`;

    reply.send(page);


});

// server start
app.listen(8080, "0.0.0.0").then((address) => {
    console.log(`Server started at ${address}`);
});