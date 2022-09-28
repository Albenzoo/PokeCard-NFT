import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import * as contract from '../artifacts/contracts/MyNFT.sol/NFTMarketplace.json';
import * as dotenv from 'dotenv';
import { AbiItem } from 'web3-utils';
import pinataMnitCid from './pinataMintCid.json';

dotenv.config();
const { API_URL, PUBLIC_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;
const web3 = createAlchemyWeb3(API_URL!);
const contractAddress = CONTRACT_ADDRESS;
console.log(JSON.stringify(contract.abi));
const nftContract = new web3.eth.Contract(
  contract.abi as AbiItem[],
  contractAddress
);

async function mintNFT(tokenURI: string) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY!, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY!);
  signPromise
    .then((signedTx: any) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              'The hash of your transaction is: ',
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              'Something went wrong when submitting your transaction:',
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(' Promise failed:', err);
    });
}
console.log(pinataMnitCid);
for (const cidCode of pinataMnitCid.CidCodes) {
  console.log("Minting: ", cidCode);
  mintNFT('ipfs://' + cidCode);
}
