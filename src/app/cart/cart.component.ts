import { Component, OnInit } from '@angular/core';
import {PurchaseManagerServiceService} from '../purchase-manager-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  drinkNames = [];
  modifiers = [];
  total = 0;
  whipCream = [];

  constructor(private purchaseService : PurchaseManagerServiceService) {
    this.cartItems = purchaseService.getContents();

    for (let i=0; i<this.cartItems.length; i++) {
      this.drinkNames.push(this.cartItems[i][0]);
      this.modifiers.push(this.cartItems[i][1]);
      this.whipCream.push(this.cartItems[i][2]);
      this.total = this.total + parseFloat((this.cartItems[i][3]));
      this.total = parseFloat(this.total.toFixed(2));
    }

  }

  ngOnInit() {
  }

  deleteItem(j) {
    for (let i=0; i<this.cartItems.length; i++) {
      if (this.modifiers[i] === this.cartItems[i][1]) {
        this.cartItems.splice(j, 1);
      }
    }
  }

}
