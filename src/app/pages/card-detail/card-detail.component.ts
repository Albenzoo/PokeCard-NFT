import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  constructor(public wallet: WalletService) { }

  ngOnInit(): void {
    console.log("detail:", this.wallet.cardDetail);
    console.log("wallet connesso:", this.wallet.walletAddress);
  }

  buyCard() {
    this.wallet.buyNFT(this.wallet.cardDetail);
  }
  parsePriceToEther(weiPrice: string): string {
    return this.wallet.web3Instance.utils.fromWei(weiPrice, 'ether');
  }

}
