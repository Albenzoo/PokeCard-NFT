import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor() {}

  web3Instance: any;
  address: string = '';

  connect(): boolean {
    if (window.ethereum) {
      console.log('Metamask is installed!');
      window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accountsAddress: string) => {
          this.address = accountsAddress[0];
          this.web3Instance = new Web3(window.ethereum);
          //const accounts = this.web3Instance.eth.getAccounts();

          console.log('Account connected successfully!', this.web3Instance);
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