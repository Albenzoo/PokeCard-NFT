import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PinataService {


  constructor(private http: HttpClient) {
  }

  uploadJSONToIPFS(newPokemonCard: Card) {
    const url = `${environment.PINATA_BASE_URL}pinning/pinJSONToIPFS`;
    const body = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": newPokemonCard.name
      },
      "pinataContent": newPokemonCard
    });
    return this.http
      .post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.PINATA_JWT}`
        }
      }).pipe(map((response: any) => {
        return {
          success: true,
          pinataURL: `ipfs://${response?.IpfsHash}`
        };
      })
        ,);
  };


  uploadFileToIPFS(image: File) {
    if (!image) {
      return throwError(() => new Error('Image not found'))
    }
    const url = `${environment.PINATA_BASE_URL}pinning/pinFileToIPFS`;
    let formData: any = new FormData();
    formData.append('file', image, image.name);

    const metadata = JSON.stringify({
      name: image.name,
    });
    formData.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
      cidVersion: 1
    });
    formData.append('pinataOptions', pinataOptions);

    return this.http
      .post(url, formData, {
        headers: {
          'Authorization': `Bearer ${environment.PINATA_JWT}`
        }
      }).pipe(
        map((response: any) => {
          return {
            success: true,
            pinataURL: `ipfs://${response?.IpfsHash}`
          };
        })
      );


  };


}


