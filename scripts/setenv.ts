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
   contractAddress: '0x682A0cD9B74cEaB00417B6391fb96B6a00b46C1B',
   PUBLIC_KEY: '0x6E9404FAdB9B092DeBDb1d883d98B9C5A4FfBa37',
   apiUrl: 'https://eth-goerli.g.alchemy.com/v2/201UMLnLvF_3ShqOfxSOX_-jiXKbRe7H',
   ipfsBaseUrl: 'https://ipfs.io/',
   ipfsBaseUrlGeteway: [
    'https://ipfs.io/',
    'https://hardbin.com/',
    'https://cloudflare-ipfs.com/',
    'https://gateway.ipfs.io/',
    'https://gateway.pinata.cloud/'
    ],
    PINATA_API_KEY: "${process.env["PINATA_API_KEY"]}",
    PINATA_API_SECRET: "${process.env["PINATA_API_SECRET"]}",
    PINATA_JWT: "${process.env["PINATA_JWT"]}",
    pinataBaseUrl: "https://api.pinata.cloud/",
};
    `;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});