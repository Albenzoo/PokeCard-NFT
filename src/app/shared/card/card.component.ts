import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Card } from 'src/app/core/models/card';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'poke-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() pokemon: Card = <Card>{};
  @Input() mode: string = "creation";
  imagePreview: any;
  isImageLoaded: boolean = true;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    console.log(this.pokemon);
    if (this.mode == "display") {
      this.isImageLoaded = false;
    }

  }


  renderImage(image: File | string) {
    if (this.pokemon.image instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(this.pokemon.image);
      reader.onload = (event: any) => { return this.pokemon.image = event.target.result; }
      return this.pokemon.image;
    } else {
      return this.utilsService.parseIpfsUrl(image as string);
    }
  }


}
