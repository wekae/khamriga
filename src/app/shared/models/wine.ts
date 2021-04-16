import {Cost} from './cost';

export interface Wine {
  no: string;
  name: string;
  image: string;
  cost: Cost;
  tags: string[];
  details: string;
}
