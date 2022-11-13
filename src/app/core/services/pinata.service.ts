import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import * as dotenv from 'dotenv';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PinataService {


  constructor(private http: HttpClient) {
  }

  uploadJSONToIPFS(newPokemonCard: Card) {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const body = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": newPokemonCard.name + "2"
      },
      "pinataContent": newPokemonCard
    });
    debugger
    return this.http
      .post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.PINATA_JWT}`
        }
      }).pipe(map((response: any) => {
        return {
          success: true,
          pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        };
      })
        ,);

  };
}
