import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetDrinksDataService {

  private _url: string = "../assets/drinksdetails.json";

  constructor(private http: HttpClient) {
       // this.getJSON().subscribe();
   }

   public getJSON(): Observable<any> {
       return this.http.get(this._url);
   }
}
