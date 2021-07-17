import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';
import { map, skipWhile, tap } from 'rxjs/operators';
import { Autocomplete } from 'src/app/models/autocomplete.model';
import { Mode } from 'src/app/models/mode.enum';
import { DailyForecast, DailyWeather, DailyWeatherDTO, ForecastsWeather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';
import { fade } from 'src/app/shared/animations/animations';
import { getDailyWeather } from 'src/app/store/weather.actions';
import { getAutocompleteSelector, getCurrentDailyWeather, getCurrentWeatherForecast, getForecastLoading } from 'src/app/store/weather.reducer';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {

  selectedCity: Autocomplete = {};
  filteredCities$!: Observable<any[]>;
  ilteredCities: Autocomplete[] = [];
  a$!: Observable<{
    dailyWeather: DailyWeather | undefined,
    weatherForcast: DailyForecast[] | undefined
  }>;
  currentDailyWeather: DailyWeather | undefined;
  DailyForecasts: ForecastsWeather | undefined

  isForecastLoading: boolean = false;
  isDailyLoading: boolean = false;
  constructor(private store: Store, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.a$ = combineLatest(this.store.select(getCurrentDailyWeather), this.store.select(getCurrentWeatherForecast)).pipe(

      map(([dailyWeather, weatherForcast]) => ({
        dailyWeather,
        weatherForcast
      })),
      skipWhile(data => !data.dailyWeather || !data.weatherForcast)
    )


    // this.store.select(getCurrentDailyWeather).pipe(
    //   map(value => {
    //     return value
    //   }),
    //   tap(value => {
    //     this.isForecastLoading = true;
    //     this.weatherService.getForecastWeather(value.fetchedCityIndex).subscribe((data: any) => {
    //       console.log(data.DailyForecasts);
    //       this.DailyForecasts = data;
    //       this.isForecastLoading = false;
    //     })
    //     return this.currentDailyWeather = value
    //   }),
    // );
    // this.currentDailyWeather$.subscribe();

    this.store.select(getForecastLoading).subscribe(loader => this.isForecastLoading = loader);
  }

}
