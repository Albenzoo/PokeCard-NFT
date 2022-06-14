import { Injectable } from '@angular/core';
import Web3 from "web3";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor() { }

  async connect() {
    if (window.ethereum) {
      console.log("I see a wallet!");
    } else {
      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
  }

}
