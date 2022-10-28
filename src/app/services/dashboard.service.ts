import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = "https://api.covid19api.com/live";


  constructor(
    public httpClient: HttpClient
  ) { }




  getNumbers(country: string) {
    let url = `https://api.covid19api.com/live/country/${country}/status/confirmed`
    return this.httpClient.get<any>(url)
  }



}
