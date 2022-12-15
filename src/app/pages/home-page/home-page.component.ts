import { Component, OnInit } from '@angular/core';
import { Contract } from 'ethers';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import Web3 from 'web3';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public wallet: WalletService, public apiService: ApiService, private spinner: NgxSpinnerService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    if (this.wallet.allNfts.length == 0) {
      this.snackBarService.openSnackBar("testo", "azione");
      //this.spinner.show();
      this.wallet.getAllNFTs();
    }
    /*     const nftContract = new this.wallet.web3.eth.Contract(
          this.wallet.contractInfo.contractABI,
          this.wallet.contractInfo.contractAddress
        );
        nftContract.defaultAccount = this.wallet.walletAddress;
        const nftBalance = nftContract.methods.balanceOf(this.wallet.walletAddress).call(); */

  }

}
