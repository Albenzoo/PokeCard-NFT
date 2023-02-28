import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuClickEvent = new EventEmitter<void>();
  constructor(public wallet: WalletService) { }

  ngOnInit(): void { }

  connectWallet() {
    if (!this.wallet.walletAddress) this.wallet.connect();
  }
  menuIconClicked() {
    this.menuClickEvent.emit();
  }
}
