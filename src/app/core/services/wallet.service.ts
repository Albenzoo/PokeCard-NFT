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
import { map, Observable, throwError } from 'rxjs';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient, private utilsService: UtilsService, private spinner: NgxSpinnerService, private snackBarService: SnackBarService) { }

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
        return response;
      })
        ,);
  }
  storeDataFromURI(url: string): void {
    const parseUrl = this.utilsService.parseIpfsUrl(url);
    this.getNftInfo(parseUrl).subscribe({
      next: (data: any) => {
        console.log({ data });
        this.allNfts.push(data);
        console.log("Tutti gli NFT:", this.allNfts);
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
      this.storeDataFromURI(tokenURI);
    }));
  }

  getMyNFTs() {
    let transaction = this.nftContract.getMyNFTs().subscribe((response: any) => {
      console.log("Ecco i miei NFT:", response);
    });

  }


  async checkWalletConnection() {
    if (!this.walletAddress) {
      return await this.connect();
    }
    return true;
  }

  public async mintNFT(tokenURI: string) {
    const isWalletConnected = await this.checkWalletConnection();
    if (!isWalletConnected) return;
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
      from: this.walletAddress,
      to: environment.contractAddress,
      nonce: nonce,
      gas: 500000,
      data: this.nftContract.methods.createToken(tokenURI, priceBN).encodeABI(),
      value: feePrice,
    };
    return this.web3.eth.sendTransaction(tx)
      .then((response) => {
        this.spinner.hide();
        this.snackBarService.openSnackBar(`NFT Created! Your transaction hash is: ${response.transactionHash}`, "OK");
        console.log({ response }, 'The hash of your transaction is: ',
          response.transactionHash,
          "\nCheck Alchemy's Mempool to view the status of your transaction!");
        return response;
      }
      )
      .catch((error) => {
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
          this.web3Instance = new Web3(window.ethereum);
          //const accounts = this.web3Instance.eth.getAccounts();

          console.log('Account connected successfully!', this.web3Instance);
          return true;
        })
        .catch(() => {
          console.log('Somethings goes wrong...retry');
          return false;
        });
      return connection;
    } else {
      this.snackBarService.openSnackBar('Non-Ethereum browser detected. You Should consider using MetaMask!', "OK", true);
      return false;
    }
  }
}
