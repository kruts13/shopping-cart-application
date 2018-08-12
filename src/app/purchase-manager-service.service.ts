import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseManagerServiceService {

  constructor() { }

  contents = [];

  purchase(allItemsArray) {
    this.contents.push(allItemsArray);
  }

  getContents() {
    return this.contents;
  }
}
