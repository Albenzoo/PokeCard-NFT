import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, connect, connectable, filter, fromEvent, interval, map, Observable, ReplaySubject, scan, share, Subject, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { ajax } from "rxjs/ajax";
import { ApiService } from 'src/app/core/services/api.service';
import { Card, Attack, Energy } from 'src/app/core/models/card';
import { AnyForUntypedForms } from '@angular/forms';
import { runInThisContext } from 'vm';




@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss']
})

export class CreateNftComponent implements OnInit {
  imageFile: File = <File>{};
  customCard: Card = <Card>{};
  imageLabel: string = "Load image";
  imagePreview: any = "";
  imageLoadedSubject: Subject<any> = new Subject<any>();
  eventsImageLoaded: Subject<void> = new Subject<void>();
  step = 0;
  price: string = "0.02";


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
          text: "",
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
    this.customCard = {
      name: "Pikachu",
      hp: 50,
      image: "",
      length: 1.4,
      weight: 13,
      type: 'Mouse',
      energy_type: 'Lightning',
      rarity: 'Common',
      attack_list: [
        {
          cost: ["Colorless"],
          name: "Gnaw",
          text: "",
          damage: 10
        },
        {
          cost: ["Lightning", "Colorless"],
          name: "Thunder Jolt",
          text: "Flip a coin. if tail, Pikachu does 10 damage to itself.",
          damage: 30
        }
      ],
      description: 'When several of these Pokémon gather, theri electricity can cause lightning storms.',
      level: undefined,
      weaknesses: ["Fighting"],
      resistance: [],
      retreatCost: ["Colorless"],
      artist: 'Mitsuhiro Arita',
      number: '58/102',
      price: "0.02",
    };

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  emitEventImageLoadedToCard(myImage: any) {
    this.eventsImageLoaded.next(myImage);
  }

  onSelectedSingleEnergy(energy: Energy) {
    this.customCard.energy_type = energy;
  }

  onAddWeakness(energy: Energy) {
    this.customCard.weaknesses.push(energy);
  }
  onRemoveWeakness(energy: Energy) {
    const index = this.customCard.weaknesses.indexOf(energy, 0);
    if (index > -1) {
      this.customCard.weaknesses.splice(index, 1);
    }
  }

  onRemoveResistance(energy: Energy) {
    const index = this.customCard.resistance.indexOf(energy, 0);
    if (index > -1) {
      this.customCard.resistance.splice(index, 1);
    }
  }
  onRemoveRetreatCost(energy: Energy) {
    const index = this.customCard.retreatCost.indexOf(energy, 0);
    if (index > -1) {
      this.customCard.retreatCost.splice(index, 1);
    }
  }
  onAddResistance(energy: Energy) {
    this.customCard.resistance.push(energy);
  }
  onAddRetreatCost(energy: Energy) {
    this.customCard.retreatCost.push(energy);
  }
  onAddAttackCost(energy: Energy, index: number) {
    this.customCard.attack_list[index].cost.push(energy);
  }
  onRemoveAttackCost(energy: Energy, index: number) {
    const found = this.customCard.attack_list[index].cost.indexOf(energy, 0);
    if (found > -1) {
      this.customCard.attack_list[index].cost.splice(found, 1);
    }
  }

  onFileSelected(event: any) {
    const file: File = event?.target?.files[0];
    if (file) {
      if (file.type.match(/image\/*/) == null) {
        console.warn("Only images are supported");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      this.customCard.image = file;
      this.imageLabel = this.customCard.image.name;
    }
  }
  uploadCard() {
    this.customCard.hp = Number(this.customCard.hp);
    this.customCard.level = Number(this.customCard.level);
    const price = Number(this.price);
    this.apiService.loadCardToIPFS(this.customCard, price);
  }

}
