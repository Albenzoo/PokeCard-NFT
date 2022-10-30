import { Injectable } from '@angular/core';
import Web3 from 'web3';
import * as contract from '../../../../artifacts/contracts/MyNFT.sol/NFTMarketplace.json';
import { AbiItem } from 'web3-utils';
import { ContractInfo } from '../models/contract-info';
import { resolve } from 'dns';
import { environment } from 'src/environments/environment';
import { any, json } from 'hardhat/internal/core/params/argumentTypes';
import { ApiService } from './api.service';
import { url } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private apiService: ApiService) { }

  web3: any = new Web3(window.ethereum);
  walletAddress: string = '';
  contractInfo: ContractInfo = {
    contractAddress: environment.contractAddress,
    contractABI: contract.abi as AbiItem[],
  };
  nftContract = new this.web3.eth.Contract(
    this.contractInfo.contractABI,
    this.contractInfo.contractAddress
  );

  allNfts: any[] = [];

  public getNftBalance(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.nftContract.defaultAccount = this.walletAddress;
      this.nftContract.methods
        .balanceOf(this.walletAddress)
        .call(function (err: any, result: any) {
          if (err != null) {
            reject(err);
          }
          console.log('Numero di NFT: ', result);
          resolve(result);
        });
    }) as Promise<number>;
  }


  storeDataFromURI(url: string): void {
    url = url.replace(':/', '');
    this.apiService.getNftInfo(environment.ipfsBaseUrl + url).subscribe({
      next: (data: any) => {
        console.log({ data });
        this.allNfts.push(data);
        console.log("Tutti gli NFT:", this.allNfts);
      },
      error: (error: any) => {
        console.log({ error });
      },
      complete: () => { }
    });
  }

  public async getAllNFTs() {
    //get all the transaction in the contract
    let transactions = await this.nftContract.methods.getAllNFTs().call();
    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transactions.map(async (i: any) => {
      const tokenURI = await this.nftContract.methods.tokenURI(i.tokenId).call();
      //const nftData = await this.getDataFromPinataURI(tokenURI);
      this.storeDataFromURI(tokenURI);
    }));


  }

  connect(): boolean {
    if (window.ethereum) {
      console.log('Metamask is installed!');
      window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accountsAddress: string) => {
          this.walletAddress = accountsAddress[0];
          console.log(this.walletAddress);
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
