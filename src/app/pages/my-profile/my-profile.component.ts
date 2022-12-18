import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, public wallet: WalletService) { }

  ngOnInit(): void {
    if (this.wallet.myNfts.length == 0) {
      this.getMyNfts();
    } else {
      // Subscribe to the isConnected Observable
      this.wallet.isConnected$.subscribe(isConnected => {
        if (isConnected === true && this.wallet.myNfts.length == 0) {
          this.getMyNfts();
        }
      })
    }
  }
  getMyNfts() {
    this.spinner.show();
    this.wallet.getMyNFTs();
  }
  refreshMyNfts() {
    this.wallet.myNfts = [];
    this.wallet.myNftsValue = 0;
    this.wallet.getMyNFTs();

  }


}
