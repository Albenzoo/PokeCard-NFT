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
  @Input() imagePreview: any = "";
  isImageLoaded: boolean = true;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    console.log(this.pokemon);
    if (this.mode == "display") {
      this.isImageLoaded = false;
      this.imagePreview = this.utilsService.parseIpfsUrl(this.pokemon.image as string);
    }

  }


  /*   renderImage(image: File | string) {
      console.log("renderizzo");
      //when on creation page
      if (this.pokemon.image instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(<File>this.pokemon.image);
        return reader.onload = (event: any) => this.imagePreview = event.target.result;
      }
      //when the file has been converted in base64 
      else if (this.pokemon.image.startsWith("data:image")) {
        return image;
      }
      //when there's a IPFS url
      else {
        return this.utilsService.parseIpfsUrl(image as string);
      }
    } */


}
