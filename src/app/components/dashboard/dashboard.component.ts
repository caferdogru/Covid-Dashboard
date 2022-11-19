import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CovidData } from 'src/app/models/covid-data';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  selectedCountry: Country;
  caseNumbers: CovidData[];
  chartData: any;
  chartTypes = ["Line", "Bar"];
  selectedChartType: string;
  loading = false;

  constructor(
    public countryService: CountryService,
    public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.countryService.getCountryInfo();
  }

  getData() {
    if (this.selectedCountry) {
      this.loading = true;
      this.dashboardService.getNumbersByCountry(this.selectedCountry.Slug).subscribe(res => {
        this.caseNumbers = res;
        // console.log(res);
        if(this.caseNumbers.length > 0) {
          this.calculateDailyCases(this.caseNumbers);
          this.drawChart();
        }
      }, (error) => {
        console.log(error);
      }, () => {this.loading = false;}
      );
    }
  }


  drawChart() {
    // const selectedChartTypeLowerCase = this.selectedChartType.toLocaleLowerCase();
    this.chartData = {
      data: [
        { x: this.caseNumbers.map((data) => data.Date), y: this.caseNumbers.map((data) => data.Confirmed), type: this.selectedChartType, name:'Confirmed' },
        // { x: this.caseNumbers.map((data) => data.Date), y: this.caseNumbers.map((data) => data.Deaths), type: selectedChartTypeLowerCase, name: 'Deaths' },
        // { x: this.caseNumbers.map((data) => data.Date), y: this.caseNumbers.map((data) => data.Recovered), type: selectedChartTypeLowerCase, name: 'Recovered' },

      ],
      layout: {
        width: 1000,
        height: 500,
        title: `Covid-19 Numbers for ${this.selectedCountry.Country}`,
        legend: {
          title: {
            text: 'Numbers'
          }
        }
      }
    };
  }


  calculateDailyCases(data: CovidData[]) {
    for (let i=1; i<this.caseNumbers.length; i++) {
      const dailyCase = data[i].Confirmed - data[i-1].Confirmed;
      data[i].DailyConfirmed = dailyCase;
    }
  }




  ngAfterViewInit() {

  }
}
