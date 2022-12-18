import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public wallet: WalletService, public apiService: ApiService, private spinner: NgxSpinnerService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    if (this.wallet.allNfts.length == 0) {
      this.spinner.show();
      this.wallet.getFirstsNFTs();
    }
  }

}
