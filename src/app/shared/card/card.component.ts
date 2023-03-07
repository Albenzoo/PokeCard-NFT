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
    if (this.mode == "display") {
      this.isImageLoaded = false;
      this.imagePreview = this.utilsService.parseIpfsUrl(this.pokemon.image as string);
    }

  }

}
