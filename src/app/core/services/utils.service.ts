import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  parseIpfsUrl(ipfsUrl: string): string {
    const cleanedIpfs = ipfsUrl.replace(':/', '');
    const parsedUrl = environment.IPFS_BASE_URL + cleanedIpfs;
    return parsedUrl;
  }

  getEurFromEth() {
    const ETH_CURRENT_PRICE_URL: string = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR";
    return this.http.get(ETH_CURRENT_PRICE_URL);
  }
}
