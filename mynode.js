const fs = require("node:fs");
const path = require("node:path");
const successColor = "\x1b[32m%s\x1b[0m";
const errorColor = "\x1b[31m%s\x1b[0m";
const checkSign = "\u{2705}";
const warningSign = "\u{26A0}";

// Carregar variáveis de ambiente do arquivo .env
require("dotenv").config({ path: "src/.env" });

// Verificar se as variáveis de ambiente foram carregadas
const requiredEnvVars = ["AUTH_CREATE", "AUTH_LOGIN", "TASK", "REFRESH_TOKEN"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.log(
    errorColor,
    `${warningSign} Variáveis de ambiente faltando: ${missingVars.join(", ")}`
  );
  console.log(
    "Verifique se o arquivo src/.env existe e contém todas as variáveis necessárias."
  );
  process.exit(1);
}

const envFile = `export const environment = {
    AUTH_CREATE: '${process.env.AUTH_CREATE}',
    AUTH_LOGIN: '${process.env.AUTH_LOGIN}',
    TASK: '${process.env.TASK}',
    REFRESH_TOKEN: '${process.env.REFRESH_TOKEN}',
};
`;

const targetPath = path.join(__dirname, "./src/environments/environment.ts");

// Garantir que o diretório existe
const targetDir = path.dirname(targetPath);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(errorColor, err);
    throw err;
  }
  console.log(
    successColor,
    `${checkSign} Successfully generated environment.ts`
  );
});
