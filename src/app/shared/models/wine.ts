import {Cost} from './cost';

export interface Wine {
  no: number;
  name: string;
  image: string;
  cost: Cost;
  tags: string[];
  details: string;
}
