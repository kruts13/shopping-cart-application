import { Component, OnInit } from '@angular/core';
import {PurchaseManagerServiceService} from '../purchase-manager-service.service';
import {GetDrinksDataService} from '../get-drinks-data.service';

@Component({
  selector: 'app-all-drinks',
  templateUrl: './all-drinks.component.html',
  styleUrls: ['./all-drinks.component.css']
})
export class AllDrinksComponent implements OnInit {

  modifierVal = '';
  elementNumber;
  drink = '';
  price = '';
  jsonData : any = '';
  getAllKeys;
  drinkName = '';
  drinkBasePrice;
  lengthOfKey;
  getKey;
  initialPrice = 0;
  total: number = 0;
  elem = document.getElementsByClassName("number-tsp");
  allItems = [];
  newArr = [];
  totalPrice: number = 0;
  currentDrinkNumber = 0;
  totalTsp: any = 0;
  sendTotalPrice: number;
  whipCreamValue: any;

  constructor(private purchaseService: PurchaseManagerServiceService, private getDrinksService: GetDrinksDataService) {
  }

  showAllItems(i) {
    if (this.currentDrinkNumber !== i) {
      this.newArr = [];
      this.allItems = [];
      this.currentDrinkNumber = i;
    }
      let flag;
      let j = 0;
      let dropDownValue: string = (<HTMLSelectElement>document.getElementsByClassName("drop-down")[i]).value;
      this.whipCreamValue = (<HTMLSelectElement>document.getElementsByClassName("whip-cream-option")[i]).value;
      let value: number = parseInt((<HTMLInputElement>this.elem[i]).value);

      this.allItems.push([dropDownValue, value]);

      if (dropDownValue !== "blank" && value !== 0) {
        if (this.newArr.length === 0) {
          this.newArr.push(this.allItems.pop());
        } else {
            for (j; j<this.newArr.length; j++) {
              if (this.newArr[j][0] !== (this.allItems[this.allItems.length-1][0])) {
                flag = 1;
              } else {
                flag = 0;
                break;
              }
            }

          if (flag === 0) {
            this.newArr[j] = this.allItems.pop();
          } else {
            this.newArr.push(this.allItems.pop());
          }
        }
      }

      document.getElementsByClassName("show-all-items")[i].innerHTML =
      "All the items selected: " + this.newArr + "<br>" + "Whipped Cream: " + this.whipCreamValue ;
  }

  addToCart(i) {
    if (this.sendTotalPrice !== 0 && this.currentDrinkNumber === i) {
      this.purchaseService.purchase([this.jsonData[this.getKey][i].name, this.newArr, this.whipCreamValue, this.sendTotalPrice]);
      this.newArr = [];
      this.sendTotalPrice = 0;
    } else {
      this.newArr = [];
      this.purchaseService.purchase([this.jsonData[this.getKey][i].name, this.newArr, 0, this.jsonData[this.getKey][i].basePrice]);

    }
  }

  ngOnInit() {
    this.getDrinksService.getJSON().subscribe(data => {
         this.getAllKeys = Object.keys(data);
         this.jsonData = data;

         for (let k=0; k<4; k++) {
           if (document.getElementsByClassName("nav-links")[k].className === "nav-links active") {
             this.getKey = this.getAllKeys[k];
           }
         }
         this.lengthOfKey = this.jsonData[this.getKey].length;
     });
   }

  public onChange(event, i): void {  // event will give you full brief of action
    this.modifierVal = event.target.value;
    (<HTMLInputElement>document.getElementsByClassName("number-tsp")[i]).value = '0';
    if (this.currentDrinkNumber !== i) {
      this.newArr = [];
      this.allItems = [];
    }
    this.currentDrinkNumber = i;
  }

  decreaseValue(i) {
    let dropDownValue: string = (<HTMLSelectElement>document.getElementsByClassName("drop-down")[i]).value;
    if (this.modifierVal !== "blank" && this.modifierVal !== "" && dropDownValue !== "blank") {
      let value: number = parseInt((<HTMLInputElement>this.elem[i]).value);
      value = isNaN(value) ? 0 : value;
      value < 1 ? value = 1 : '';
      value--;
      (<HTMLInputElement>this.elem[i]).value = value.toFixed();
    }
  }

  increaseValue(i) {
    let dropDownValue: string = (<HTMLSelectElement>document.getElementsByClassName("drop-down")[i]).value;
    if (this.modifierVal !== "blank" && this.modifierVal !== "" && dropDownValue !== "blank") {
      let value: number = parseInt((<HTMLInputElement>this.elem[i]).value);
      value = isNaN(value) ? 0 : value;
      value++;
      (<HTMLInputElement>this.elem[i]).value = value.toFixed();
    }
  }

  showPrice(i) {
    if ((<HTMLSelectElement>document.getElementsByClassName("whip-cream-option")[this.currentDrinkNumber]) !== undefined) {
      this.whipCreamValue = (<HTMLSelectElement>document.getElementsByClassName("whip-cream-option")[this.currentDrinkNumber]).value;
    }

    if (this.whipCreamValue === "yes") {
      this.whipCreamValue = 0.50;
    } else {
      this.whipCreamValue = 0;
    }

    if (this.newArr.length !== 0) {
      for (let j=0; j<this.newArr.length; j++) {
          this.totalTsp = this.totalTsp + parseInt(this.newArr[j][1]);
      }
      this.totalPrice = parseFloat(this.jsonData[this.getKey][this.currentDrinkNumber].basePrice) +
      (this.totalTsp*0.30) + parseFloat(this.whipCreamValue);

      this.totalTsp = 0;
    }
    this.sendTotalPrice = this.totalPrice;
    document.getElementsByClassName("show-price")[this.currentDrinkNumber].innerHTML =
    "Price: $" + this.totalPrice.toFixed(2);
    this.totalPrice = 0;
  }
}
