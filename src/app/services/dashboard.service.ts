import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Country } from '../models/country';
import { CovidData } from '../models/covid-data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = "https://api.covid19api.com/live";


  constructor(
    public httpClient: HttpClient
  ) { }




  getNumbersByCountry(country: string) {
    let url = `https://api.covid19api.com/live/country/${country}/status/confirmed`
    return this.httpClient.get<CovidData[]>(url)
  }

  getGlobalData() {
    return this.httpClient.get<any>('https://api.covid19api.com/summary');
  }


}
