import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Web3 from "web3";
import Web3Modal from "web3modal";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private web3js: any;
  private provider: any;
  private accounts: any;
  private web3Modal;

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {


  }

  async connect() {
    if (window.ethereum) {
      console.log("I see a wallet!");
    } else {
      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
  }

}
