import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, concatMap, from, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { PinataService } from './pinata.service';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private pinataService: PinataService, public walletService: WalletService) { }




  loadCardToIPFS(newCard: Card) {
    /*   let card: Card = {
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
      }; */

    this.pinataService.uploadFileToIPFS(newCard.image as File).pipe(
      switchMap(response1 => {
        console.log("Card image response:", response1);
        newCard.image = response1.pinataURL;
        return this.pinataService.uploadJSONToIPFS(newCard);
      }),
      switchMap(response2 => from(this.walletService.mintNFT(response2.pinataURL)))
    ).subscribe({
      next: (data: any) => {
        console.log("Finale response:", data);
      },
      error: (error: any) => {
        console.log("error uploading the card:", error);
      },
    });

  }


}
