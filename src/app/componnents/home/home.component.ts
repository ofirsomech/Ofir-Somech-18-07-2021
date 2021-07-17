import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Autocomplete } from 'src/app/models/autocomplete.model';
import { Mode } from 'src/app/models/mode.enum';
import { DailyWeather, DailyWeatherDTO, ForecastsWeather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';
import { fade } from 'src/app/shared/animations/animations';
import { getDailyWeather } from 'src/app/store/weather.actions';
import { getAutocompleteSelector , getCurrentDailyWeather } from 'src/app/store/weather.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {
  mode = Mode.Light;
  selectedCity: Autocomplete ={};
  filteredCities$!: Observable<any[]>;
  ilteredCities: Autocomplete[] = [];
  currentDailyWeather$!: Observable<DailyWeather>;
  currentDailyWeather: DailyWeather | undefined;
  DailyForecasts: ForecastsWeather | undefined
  constructor(private store: Store , private weatherService:WeatherService) { }

  ngOnInit(): void {
    this.currentDailyWeather$ = this.store.select(getCurrentDailyWeather).pipe(
      map(value => {
        console.log("currentDailyWeather");
        console.log(value);
        
        return value} ),
      tap(value => {
        this.weatherService.getForecastWeather(value.fetchedCityIndex).subscribe((data:any) =>{
          console.log(data.DailyForecasts);
          this.DailyForecasts = data;
          
        })
       return this.currentDailyWeather = value
      }),
    );
  }
  switchMode(mode: Mode) {
    if (mode === Mode.Light) {
      document.querySelector('body')?.style.setProperty('--bg-color', '#272727');
      document.querySelector('body')?.style.setProperty('--text-color', '#f8fafb');
      this.mode = Mode.Dark;
    } else {
      document.querySelector('body')?.style.setProperty('--bg-color', '#f8fafb');
      document.querySelector('body')?.style.setProperty('--text-color', '#272727');
      this.mode = Mode.Light;
    }
  }

}
