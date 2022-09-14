import { Injectable } from '@angular/core';
import Web3 from 'web3';
import * as contract from '../../../../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { AbiItem } from 'web3-utils';
import { ContractInfo } from '../models/contract-info';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor() { }

  web3: any = new Web3(window.ethereum);
  walletAddress: string = '';
  contractInfo: ContractInfo = {
    contractAddress: '0x99151d26159362457c41b8c96a93680ef776b7dd',
    contractABI: contract.abi as AbiItem[],
  };
  nftContract = new this.web3.eth.Contract(
    this.contractInfo.contractABI,
    this.contractInfo.contractAddress
  );

  public async getNftBalance(): Promise<number> {

    return new Promise((resolve, reject) => {
      let _web3 = this.web3;
      this.nftContract.defaultAccount = this.walletAddress;
      this.nftContract.methods.balanceOf(this.walletAddress).call(function (err: any, result: any) {
        if (err != null) {
          reject(err);
        }
        debugger
        resolve(result);
      });
    }) as Promise<number>;
  }



  connect(): boolean {
    debugger
    if (window.ethereum) {
      console.log('Metamask is installed!');
      window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accountsAddress: string) => {
          this.walletAddress = accountsAddress[0];
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
