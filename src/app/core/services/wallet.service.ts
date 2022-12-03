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
import { map, Observable } from 'rxjs';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) { }

  web3Instance: any = new Web3(window.ethereum);
  web3 = createAlchemyWeb3(
    environment.apiUrl,
  );
  walletAddress: string = '';
  contractInfo: ContractInfo = {
    contractAddress: environment.contractAddress,
    contractABI: contract.abi as AbiItem[],
  };
  nftContract = new this.web3Instance.eth.Contract(
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

  getNftInfo(url: string): Observable<any> {
    return this.http
      .get(url).pipe(map((response: any) => {
        // modify the response  data
        if (response.image) {
          response.image = response.image.replace('ipfs://', environment.ipfsBaseUrl + 'ipfs/');
        }
        // return the modified data
        return response;
      })
        ,);
  }
  storeDataFromURI(url: string): void {
    url = url.replace(':/', '');
    this.getNftInfo(environment.ipfsBaseUrl + url).subscribe({
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

  public async mintNFT(tokenURI: string) {
    const nonce = await this.web3.eth.getTransactionCount(environment.PUBLIC_KEY, 'latest'); //get latest nonce

    const inputPrice: number = 0.02;
    const price = this.web3.utils.toWei(inputPrice.toString(), 'ether');
    const priceBN = this.web3.utils.toBN(price);
    console.log('NFT price set:', price, 'Wei');

    //get the fee price to be payed in every transaction
    let feePrice = await this.nftContract.methods.getListPrice().call();
    feePrice = feePrice.toString();
    console.log('Fee:', feePrice, 'Wei');

    //actually create the NFT
    //return;
    //the transaction
    const tx = {
      from: environment.PUBLIC_KEY,
      to: environment.contractAddress,
      nonce: nonce,
      gas: 500000,
      data: this.nftContract.methods.createToken(tokenURI, priceBN).encodeABI(),
      value: feePrice,
    };

    const signPromise = this.web3.eth.accounts
      .signTransaction(tx, environment.PRIVATE_KEY)
      .then((signedTx: any) => {
        this.web3.eth.sendSignedTransaction(
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
