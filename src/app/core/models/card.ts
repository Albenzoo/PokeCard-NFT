export type Energy = 'Fire' | 'Fighting' | 'Lightning' | 'Grass' | 'Water' | 'Psychic' | 'Darkness' | 'Metal' | 'Colorless' | null;
type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Promo';
export interface Card {
  tokenId?: string,
  name: string; //The name of the card
  image: File | string;
  hp: number; //The hit points of the card
  length: number;
  weight: number;
  type: string; //seed,mouse,ecc
  energy_type: Energy; //The energy types for a card, such as Fire, Fighting, Dragon, Lightning, Grass, Water, Fairy, Psychic, Darkness, Metal, and Colorless
  rarity: Rarity; //Common, Uncommon, Rare, Special
  attack_list: Attack[]; //One or more attacks for a given car
  weaknesses: Energy[]; //One or more weaknesses for a given card
  resistance: Energy[]; //One or more resistances for a given card
  retreatCost: Energy[]; //A list of costs it takes to retreat and return the card to your bench
  description: string;
  level?: number;
  artist: string; //The artist of the card
  number: string; //The nuber of the card
  price: string;
  seller?: string;

}

export interface Attack {
  cost: Energy[]; //The cost of the attack represented by a list of energy types
  name: string; //The name of the attack
  text?: string; //The text or description associated with the attack
  damage?: number; //The damage amount of the attack
}
export interface EnergyValue {
  type: Energy; //The type of energy, such as Fire or Water.
  value: number; //The value of the weakness x2, x3, etc..
}


