import { Injectable } from '@angular/core';

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
