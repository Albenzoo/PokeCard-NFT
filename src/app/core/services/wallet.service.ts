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
import { map, Observable, Subject, throwError } from 'rxjs';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarService } from './snack-bar.service';
import { Card } from '../models/card';
import { CardComponent } from 'src/app/shared/card/card.component';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient, private utilsService: UtilsService, private spinner: NgxSpinnerService, private snackBarService: SnackBarService) { }

  //web3Instance: any = new Web3(window.ethereum);
  walletAddress: string = '';
  private subject = new Subject<boolean>();
  web3Instance = createAlchemyWeb3(
    environment.ALCHEMY_PROVIDER,
  );
  // Observable stream
  isConnected$: Observable<boolean> = this.subject.asObservable();


  contractInfo: ContractInfo = {
    contractAddress: environment.CONTRACT_ADDRESS,
    contractABI: contract.abi as AbiItem[],
  };
  nftContract = new this.web3Instance.eth.Contract(
    this.contractInfo.contractABI,
    this.contractInfo.contractAddress
  );

  allNfts: Card[] = [];
  myNfts: Card[] = [];
  lastNfts: Card[] = [];
  myNftsValue: number = 0;
  cardDetail: Card = <Card>{};


  // Method to update the value of the variable
  updateConnectedStatus(value: boolean) {
    this.subject.next(value);
  }

  public getNftBalance(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.nftContract.defaultAccount = this.walletAddress;
      this.nftContract.methods
        .balanceOf(this.walletAddress)
        .call(function (err: any, result: any) {
          if (err != null) {
            reject(err);
          }
          resolve(result);
        });
    }) as Promise<number>;
  }

  getNftInfo(url: string): Observable<any> {
    return this.http
      .get(url).pipe(map((response: any) => {
        return response;
      })
        ,);
  }
  storeDataFromURI(tokenId: string, url: string, price: string, seller: string, addToMyNfts?: string): void {
    const parseUrl = this.utilsService.parseIpfsUrl(url);
    this.getNftInfo(parseUrl).subscribe({
      next: (data: Card) => {
        data = { ...data, tokenId, price, seller };

        switch (addToMyNfts) {
          case "myNfts":
            this.myNfts.push(data);
            break;
          case "allNfts":
            this.allNfts.push(data);
            break;
          case "lastNfts":
            this.lastNfts.push(data);
            break;
          default:
            this.allNfts.push(data);
            break;
        }
      },
      error: (error: any) => {
        console.log({ error });
      },
      complete: () => { this.spinner.hide() }
    });
  }

  public async getAllNFTs() {
    //get all the transaction in the contract
    let transactions = await this.nftContract.methods.getAllNFTs().call();
    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transactions.map(async (i: any) => {
      const tokenURI = await this.nftContract.methods.tokenURI(i.tokenId).call();
      //const nftData = await this.getDataFromPinataURI(tokenURI);
      this.storeDataFromURI(i.tokenId, tokenURI, i.price, i.seller, "allNfts");
    }));
  }
  public async getLastNFTs() {
    //get all the transaction in the contract
    let transactions = await this.nftContract.methods.getAllNFTs().call();
    const slicedArray = transactions.slice(transactions.length - 4, transactions.length);
    let counter = 0;
    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(slicedArray.map(async (i: any) => {
      const tokenURI = await this.nftContract.methods.tokenURI(i.tokenId).call();
      //const nftData = await this.getDataFromPinataURI(tokenURI);
      this.storeDataFromURI(i.tokenId, tokenURI, i.price, i.seller, "lastNfts");
    }));
  }

  async buyNFT(cardToBuy: Card) {
    this.spinner.show();
    const isWalletConnected = await this.checkWalletConnection();
    if (!isWalletConnected) return;
    const salePrice = this.web3Instance.utils.fromWei(cardToBuy.price!, 'ether');
    const priceBN = this.web3Instance.utils.toBN(cardToBuy.price!);
    let message = {
      value: priceBN
    }
    //run the executeSale function
    return await this.nftContract.methods.executeSale(cardToBuy.tokenId).send(message)
      .then((response: any) => {
        this.spinner.hide();
        this.snackBarService.openSnackBar(`Card purchased correctly!`, "Awesome");
        console.log({ response }, 'The hash of your transaction is: ',
          response.transactionHash,
          "\nCheck Alchemy's Mempool to view the status of your transaction!");
        return response;
      }
      )
      .catch((error: any) => {
        console.error(error);
        this.snackBarService.openSnackBar(error.message, "OK", true);
        this.spinner.hide();
        return throwError(() => new Error('Error buying card'))
      });


  }


  async getMyNFTs() {
    const isWalletConnected = await this.checkWalletConnection();
    if (!isWalletConnected) return;
    let allMyNFTsTransactions = await this.nftContract.methods.getMyNFTs().call();

    const items = await Promise.all(allMyNFTsTransactions.map(async (i: any) => {
      const tokenURI = await this.nftContract.methods.tokenURI(i.tokenId).call();
      const priceEther = this.web3Instance.utils.fromWei(i.price, 'ether');

      this.myNftsValue += Number(priceEther);
      return this.storeDataFromURI(i.tokenId, tokenURI, i.price, i.seller, "myNfts");
    }));
  }


  async checkWalletConnection() {
    if (!this.walletAddress) {
      return await this.connect();
    }
    return true;
  }

  public async mintNFT(tokenURI: string, inputPrice: number) {
    const isWalletConnected = await this.checkWalletConnection();
    if (!isWalletConnected) return;
    const nonce = await this.web3Instance.eth.getTransactionCount(this.contractInfo.contractAddress, 'latest'); //get latest nonce

    //const inputPrice: number = 0.02;
    const price = this.web3Instance.utils.toWei(inputPrice.toString(), 'ether');
    const priceBN = this.web3Instance.utils.toBN(price);
    console.log('NFT price set:', price, 'Wei');

    //get the fee price to be payed in every transaction
    let feePrice = await this.nftContract.methods.getListPrice().call();
    feePrice = feePrice.toString();
    console.log('Fee:', feePrice, 'Wei');

    //actually create the NFT
    //return;
    //the transaction
    const tx = {
      from: this.walletAddress,
      to: this.contractInfo.contractAddress,
      nonce: nonce,
      gas: 500000,
      data: this.nftContract.methods.createToken(tokenURI, priceBN).encodeABI(),
      value: feePrice,
    };
    return this.web3Instance.eth.sendTransaction(tx)
      .then((response: any) => {
        this.spinner.hide();
        this.snackBarService.openSnackBar(`NFT Created! Your transaction hash is: ${response.transactionHash}`, "OK");
        console.log({ response }, 'The hash of your transaction is: ',
          response.transactionHash,
          "\nCheck Alchemy's Mempool to view the status of your transaction!");
        return response;
      }
      )
      .catch((error: any) => {
        console.error(error);
        this.snackBarService.openSnackBar(error.message, "OK", true);
        this.spinner.hide();
        return throwError(() => new Error('Error minting the NFT'))
      });
  }


  async connect() {
    if (window.ethereum) {
      console.log('Metamask is installed!');
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x5') {
        console.log('Incorrect network! Trying to switch your metamask network to Goerli');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        });
      }
      const connection = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accountsAddress: string) => {
          this.walletAddress = accountsAddress[0];
          console.log(this.walletAddress);
          //this.web3Instance = new Web3(window.ethereum);
          this.nftContract = new this.web3Instance.eth.Contract(
            this.contractInfo.contractABI,
            this.contractInfo.contractAddress,
            {
              from: this.walletAddress,
            }
          );
          this.updateConnectedStatus(true);
          //const accounts = this.web3Instance.eth.getAccounts();

          console.log('Account connected successfully!', this.web3Instance);
          return true;
        })
        .catch(() => {
          console.log('Somethings goes wrong...retry');
          this.spinner.hide();
          return false;
        });
      return connection;
    } else {
      this.snackBarService.openSnackBar('Non-Ethereum browser detected. You Should consider using MetaMask!', "OK", true);
      this.spinner.hide();
      return false;
    }
  }
}
