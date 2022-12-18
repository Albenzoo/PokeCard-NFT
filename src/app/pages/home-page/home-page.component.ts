import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from 'src/app/core/models/card';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, public wallet: WalletService, public apiService: ApiService, private spinner: NgxSpinnerService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.wallet.lastNfts = [];
    this.wallet.getLastNFTs();
  }

  goToCardDetail(cardClicked: Card) {
    this.wallet.cardDetail = cardClicked;
    this.router.navigate([`/card-detail`]);
  }

}
