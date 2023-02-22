import { Component } from '@angular/core';
import packageJson from '../../package.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokecard-nft';
  version: string = packageJson.version;

  constructor() {
    console.log(`Pokecard-NFT v.${this.version}`);
  }
}
