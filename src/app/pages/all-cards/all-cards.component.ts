import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from 'src/app/core/models/card';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit {

  constructor(private router: Router, public wallet: WalletService, private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    if (this.wallet.allNfts.length == 0) {
      this.spinner.show();
      this.wallet.getAllNFTs();
    }
  }

  refreshAllNfts() {
    this.spinner.show();
    this.wallet.allNfts = [];
    this.wallet.getAllNFTs();
  }

  goToCardDetail(cardClicked: Card) {
    this.wallet.cardDetail = cardClicked;
    this.router.navigate([`/card-detail`]);
  }

}
