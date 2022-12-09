import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  parseIpfsUrl(ipfsUrl: string): string {
    const cleanedIpfs = ipfsUrl.replace(':/', '');
    const parsedUrl = environment.ipfsBaseUrl + cleanedIpfs;
    return parsedUrl;
  }
}
