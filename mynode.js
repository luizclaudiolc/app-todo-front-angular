const fs = require("node:fs");
const path = require("node:path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "src/.env" });

const envFile = `export const environment = {
    AUTH_CREATE: '${process.env.AUTH_CREATE}',
    AUTH_LOGIN: '${process.env.AUTH_LOGIN}',
    TASK: '${process.env.TASK}',
    REFRESH_TOKEN: '${process.env.REFRESH_TOKEN}',
};
`;
const targetPath = path.join(__dirname, "./src/environments/environment.ts");
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(
    successColor,
    `${checkSign} Successfully generated environment.ts`
  );
});
