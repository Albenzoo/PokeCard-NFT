import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Energy } from 'src/app/core/models/card';

@Component({
  selector: 'app-energy-chooser',
  templateUrl: './energy-chooser.component.html',
  styleUrls: ['./energy-chooser.component.scss']
})
export class EnergyChooserComponent implements OnInit {

  @Input() listLabel: string = "Energy type Selected";
  @Input() chooserLabel: string = "Select Energy Type";
  @Input() mode: string = "multi";
  @Output() selectedSingleEnergy = new EventEmitter<Energy>();
  @Output() selectedMultipleEnergy = new EventEmitter<Energy>();
  @Output() deleteEnergy = new EventEmitter<Energy>();


  energyTypes: Energy[] = ['Fire', 'Fighting', 'Lightning', 'Grass', 'Water', 'Psychic', 'Darkness', 'Metal', 'Colorless'];
  @Input() selectedEnergies: Energy[] = [];
  @Input() singleEnergy: Energy = null;
  constructor() { }

  ngOnInit(): void {
  }
  removeEnergy(energy: Energy): void {
    const index = this.selectedEnergies.indexOf(energy, 0);
    if (index > -1) {
      this.selectedEnergies.splice(index, 1);
      this.deleteEnergy.emit(energy);
    }
  }

  addEnergy(energy: Energy): void {
    if (this.mode != "multi") {
      this.singleEnergy = energy;
      this.selectedSingleEnergy.emit(this.singleEnergy);
    } else {
      if (this.selectedEnergies.length < 4) {
        this.selectedEnergies.push(energy);
        //this.selectedMultipleEnergy.emit(energy);
      }
    }
  }
}
