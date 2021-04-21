import {CartItem} from './cart-item';

export class ShoppingCart{
  private items: CartItem[] = [];
  private itemsCount: number;
  private total: number;

  public addItem(item: CartItem): void {
    if (this.itemExists(item)) {
      this.removeItem(item);
    }

    this.items.push(item);
    this.itemsCount = this.getItemsCount();
    this.total = this.getTotal();
  }

  public removeItem(item: CartItem): void{
    this.items = this.items.filter(itm => itm.id !== item.id && itm.packaging === item.packaging);
  }

  public itemExists(item: CartItem): boolean {
    const itm = this.items.filter(it => it.id === item.id && it.packaging === item.packaging);
    return itm !== null;
  }

  public getItems(): CartItem[] {
    return this.items;
  }

  public getTotal(): number {
    if (this.items.length > 0) {
      let totalCost = 0;
      this.items.forEach((item) => {
        totalCost += item.totalPrice;
      });

      return totalCost;
    }else{
      return 0;
    }
  }

  public getItemsCount(): number {
    return this.items.length;
  }
}
