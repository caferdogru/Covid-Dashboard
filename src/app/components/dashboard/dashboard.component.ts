import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { Confirmed } from 'src/app/models/confirmed';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
@ViewChild("chart") chart: ElementRef;

statusTypes = ["Confirmed", "Death"];
selectedCountry:Country;
selectedStatus: string;
caseNumbers: Confirmed[];
chartData:any;
chartTypes = ["Line","Bar"];
selectedChartType:string;

  constructor(
    public countryService: CountryService,
    public dashboardService: DashboardService
    ) { }

  ngOnInit(): void {
    this.countryService.getCountryInfo();
  }

  getData() {
    if(this.selectedCountry) { 
      this.dashboardService.getNumbers(this.selectedCountry.Slug).subscribe(res => {
        this.caseNumbers = res;
        // this.calculateDailyCases(this.caseNumbers);
        this.drawChart();
      });
    } 
  }


  drawChart() {
    this.chartData = {
      data:[
        {x: this.caseNumbers.map((data) => data.Date), y: this.caseNumbers.map((data) => data.Confirmed), type:this.selectedChartType.toLocaleLowerCase()},
        {x: this.caseNumbers.map((data) => data.Date), y: this.caseNumbers.map((data) => data.Deaths), type:this.selectedChartType.toLocaleLowerCase()},
        {x: this.caseNumbers.map((data) => data.Date), y: this.caseNumbers.map((data) => data.Recovered), type:this.selectedChartType.toLocaleLowerCase()},

      ],
      layout: {width:1500, height:500, title: `Covid-19 Numbers for ${this.selectedCountry.Country}`}
    };
  }


  // calculateDailyCases(data: Confirmed[]) {
  //   for (let i=1; i<this.caseNumbers.length; i++) {
  //     // let dailyCase;
  //     const dailyCase = this.caseNumbers[i].Cases - this.caseNumbers[i-1].Cases
  //     this.caseNumbers[i].DailyCase = dailyCase;
  //   }
  // }




    ngAfterViewInit() {

    }
}
