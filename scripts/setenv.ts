const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   CONTRACT_ADDRESS: "${process.env["CONTRACT_ADDRESS"]}",
   PUBLIC_KEY: "${process.env["PUBLIC_KEY"]}",
   IPFS_BASE_URL: "${process.env["IPFS_BASE_URL"]}",
   PINATA_JWT: "${process.env["PINATA_JWT"]}",
   PINATA_BASE_URL: "${process.env["PINATA_BASE_URL"]}",
   ALCHEMY_PROVIDER: "${process.env["ALCHEMY_PROVIDER"]}",
};
    `;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});