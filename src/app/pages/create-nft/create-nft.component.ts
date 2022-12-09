import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, connect, connectable, filter, fromEvent, interval, map, Observable, ReplaySubject, scan, share, Subject, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { ajax } from "rxjs/ajax";
import { ApiService } from 'src/app/core/services/api.service';
import { Card, Attack } from 'src/app/core/models/card';
import { AnyForUntypedForms } from '@angular/forms';




@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss']
})

export class CreateNftComponent implements OnInit {
  imageFile: File = <File>{};
  customCard: Card = <Card>{};
  attackList: Attack[] = [{ cost: ["Fire"] }];
  imageLabel: string = "Load card image ->";
  imagePreview: any;

  eventsImageLoaded: Subject<void> = new Subject<void>();




  constructor(private apiService: ApiService) {

  }

  ngOnInit() {

    /* this.customCard = {
      name: "Charmander",
      hp: 50,
      image: "",
      length: 2.0,
      weight: 19,
      type: 'Lizard',
      energy_type: 'Fire',
      rarity: 'Common',
      attack_list: [
        {
          cost: ["Colorless"],
          name: "Scratch",
          text: "Discard I Fire Energy card attached to Charmander in order to use this attack.",

          damage: 50
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

  }
  emitEventImageLoadedToCard(myImage: any) {
    this.eventsImageLoaded.next(myImage);
  }

  onFileSelected(event: any) {
    const file: File = event?.target?.files[0];
    if (file) {
      if (file.type.match(/image\/*/) == null) {
        console.warn("Only images are supported");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => this.imagePreview = event.target.result;
      this.emitEventImageLoadedToCard(file)
      this.customCard.image = file;
      this.imageLabel = this.customCard.image.name;
    }
  }
  uploadCard() {
    this.customCard.attack_list = this.attackList;
    this.customCard.hp = Number(this.customCard.hp);
    this.customCard.level = Number(this.customCard.level);
    console.log("customCard:", this.customCard);

    this.apiService.loadCardToIPFS(this.customCard);

  }

}
