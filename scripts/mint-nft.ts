import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import * as contract from '../artifacts/contracts/MyNFT.sol/MyNFT.json';
import * as dotenv from 'dotenv';


dotenv.config();
const { API_URL } = process.env;
const web3 = createAlchemyWeb3(API_URL!)
console.log(JSON.stringify(contract.abi));
