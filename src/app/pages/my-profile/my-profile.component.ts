import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from 'src/app/core/models/card';
import { UtilsService } from 'src/app/core/services/utils.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  totalValueEur: string = "";
  constructor(private router: Router, private utilsService: UtilsService, private spinner: NgxSpinnerService, public wallet: WalletService) { }

  ngOnInit(): void {
    if (this.wallet.myNfts.length == 0) {
      this.getMyNfts();
    } else {
      // Subscribe to the isConnected Observable
      this.wallet.isConnected$.subscribe(isConnected => {
        if (isConnected === true && this.wallet.myNfts.length == 0) {
          this.getMyNfts();
        }
      });
      this.parseTotalValueToEur();
    }
  }
  getMyNfts() {
    this.spinner.show();
    this.wallet.getMyNFTs();
    this.parseTotalValueToEur();

  }
  refreshMyNfts() {
    this.wallet.myNfts = [];
    this.wallet.myNftsValue = 0;
    this.wallet.getMyNFTs();
  }

  parseTotalValueToEur() {
    this.utilsService.getEurFromEth().subscribe((data: any) => {
      this.totalValueEur = (data.EUR * this.wallet.myNftsValue).toString();
    });
  }
  goToCardDetail(cardClicked: Card) {
    this.wallet.cardDetail = cardClicked;
    this.router.navigate([`/card-detail`]);
  }


}
