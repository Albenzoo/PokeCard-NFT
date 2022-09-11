import { Injectable } from '@angular/core';
import Web3 from 'web3';
import * as contract from '../../../../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { AbiItem } from 'web3-utils';
import { MyContract } from '../models/my-contract';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor() {}

  web3: any = new Web3(window.ethereum);
  address: string = '';
  myContract: MyContract = {
    contractAddress: '0x99151d26159362457c41b8c96a93680ef776b7dd',
    contractABI: contract.abi as AbiItem[],
  };
  nftContract = new this.web3.eth.Contract(
    this.myContract.contractABI,
    this.myContract.contractAddress
  );

  connect(): boolean {
    if (window.ethereum) {
      console.log('Metamask is installed!');
      window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accountsAddress: string) => {
          this.address = accountsAddress[0];
          this.web3 = new Web3(window.ethereum);
          //const accounts = this.web3Instance.eth.getAccounts();

          console.log('Account connected successfully!', this.web3);
          return true;
        })
        .catch(() => {
          console.log('Somethings goes wrong...retry');
          return false;
        });
    } else {
      window.alert(
        'Non-Ethereum browser detected. You Should consider using MetaMask!'
      );
      return false;
    }
    return false;
  }
}
