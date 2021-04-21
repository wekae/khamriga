import {Wine} from './wine';
import {PackagingTypes} from '../enums/packaging-types';

export class CartItem{
  id: string;
  name: string;
  item: Wine;
  packaging: PackagingTypes;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
