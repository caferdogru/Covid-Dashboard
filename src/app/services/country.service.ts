import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(public httpClient: HttpClient) { }


  baseUrl = "https://api.covid19api.com/";
  countryList: Country[] = [];

  getCountryInfo() {
    this.httpClient.get<Country[]>(this.baseUrl + "countries").subscribe(res => {
      this.countryList = res.sort((a,b) => a.Country < b.Country ? -1: 1);
    })
  }


}


