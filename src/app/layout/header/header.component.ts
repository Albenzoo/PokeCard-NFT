import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public wallet: WalletService) {}

  ngOnInit(): void {}

  connectWallet() {
    if (!this.wallet.web3Instance) this.wallet.connect();
  }
}
