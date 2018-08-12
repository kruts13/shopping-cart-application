import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import {PurchaseManagerServiceService} from '../app/purchase-manager-service.service';
import {GetDrinksDataService} from '../app/get-drinks-data.service';
import { AllDrinksComponent } from './all-drinks/all-drinks.component';

const appRoutes: Routes = [
  { path: 'tea', component: AllDrinksComponent },
  { path: 'coffee', component: AllDrinksComponent },
  { path: 'chocolate', component: AllDrinksComponent },
  { path: 'refreshers', component: AllDrinksComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    AllDrinksComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
