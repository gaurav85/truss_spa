import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader: boolean = false;
  planets: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPlanets();
  }

  loadPlanets() {
    let that = this;
    this.showLoading();
    this.http.get("https://swapi.dev/api/planets/").subscribe((data: any) => {
      that.hideLoading();
      console.log(data);
      if(data && data.hasOwnProperty('count') && data.count > 0 && data.hasOwnProperty('results') && data.results) {
        that.planets = data.results.sort(function(a: any, b: any) {
          return that.compareStrings(a.name, b.name);
        })
      }
    }, (error: any) => {
      that.hideLoading();
      console.log(error);
      alert('There was a problem loading the list of planets!!!');
    });
  }

  showLoading() {
    this.showLoader = true;
  };

  hideLoading() {
    this.showLoader = false;
  };

  filterColumnVal(val: any) {
    if(val == "unknown") {
      return '?';
    }
    else {
      return val;
    }
  }

  calculateWaterSurfaceArea(waterPercentage: any, diameter: any) {
    if(waterPercentage == '?' || diameter == '?') {
      return '?';
    }

    // sphere surface area is 4 times pi times radius squared
    let totalArea = 4 * Math.PI * Math.pow((diameter / 2), 2);
    return this.numberWithSpaces(Math.round((waterPercentage / 100) * totalArea));
  }

  numberWithSpaces(val: any) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  compareStrings(a: string, b: string) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }
}
