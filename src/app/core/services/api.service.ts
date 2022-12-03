import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, concatMap, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { PinataService } from './pinata.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private pinataService: PinataService) { }

  getNftInfo(url: string): Observable<any> {
    return this.http
      .get(url).pipe(map((response: any) => {
        // modify the response  data
        if (response.image) {
          response.image = response.image.replace('ipfs://', environment.ipfsBaseUrl + 'ipfs/');
        }
        // return the modified data
        return response;
      })
        ,);
  }


  loadCardToIPFS(image: any) {
    let card: Card = {
      name: "Charmander",
      hp: 50,
      image: image,
      length: 2.0,
      weight: 19,
      type: 'Lizard',
      energy_type: 'Fire',
      rarity: 'Common',
      attack_list: [
        {
          cost: ["Colorless"],
          name: "Scratch",
          damage: 10
        },
        {
          cost: ["Fire", "Colorless"],
          name: "Ember",
          text: "Discard I Fire Energy card attached to Charmander in order to use this attack.",
          damage: 30
        }
      ],
      description: 'Obviously prefers hot places. If it gets caught in the rain, steam is said to spout from the tip of his tail.',
      level: 10,
      weaknesses: ["Water"],
      resistance: [],
      retreatCost: ["Colorless"],
      artist: 'Mitsuhiro Arita',
      number: '46/102'
    };

    this.pinataService.uploadFileToIPFS(image).pipe(
      switchMap(response => {
        console.log({ response });
        card.image = response.pinataURL;
        return this.pinataService.uploadJSONToIPFS(card);
      })
    ).subscribe({
      next: (data: any) => {
        console.log("successo:", { data });
      },
      error: (error: any) => {
        console.log("error uploading the card:", error);
      },
    });




  }


  /* uploadMetadataToIPFS() {
    let card: Card = {
      name: "Charmander",
      hp: 50,
      //image: 'image',
      length: 2.0,
      weight: 19,
      type: 'Lizard',
      energy_type: 'Fire',
      rarity: 'Common',
      attack_list: [
        {
          cost: ["Colorless"],
          name: "Scratch",
          damage: 10
        },
        {
          cost: ["Fire", "Colorless"],
          name: "Ember",
          text: "Discard I Fire Energy card attached to Charmander in order to use this attack.",
          damage: 30
        }
      ],
      description: 'Obviously prefers hot places. If it gets caught in the rain, steam is said to spout from the tip of his tail.',
      level: 10,
      weaknesses: ["Water"],
      resistance: [],
      retreatCost: ["Colorless"],
      artist: 'Mitsuhiro Arita',
      number: '46/102'
    };


    //upload the metadata JSON to IPFS
    this.pinataService.uploadJSONToIPFS(card).subscribe({
      next: (data: any) => {
        console.log({ data });
      },
      error: (error: any) => {
        console.log("error uploading JSON metadata:", error);
      },
    });

  } */

}
