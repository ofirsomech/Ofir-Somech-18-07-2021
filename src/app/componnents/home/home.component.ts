import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';
import { map, skipWhile, tap } from 'rxjs/operators';
import { Autocomplete } from 'src/app/models/autocomplete.model';
import { Mode } from 'src/app/models/mode.enum';
import { DailyForecast, DailyWeather, DailyWeatherDTO, ForecastsWeather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';
import { fade } from 'src/app/modules/shared/animations/animations';
import { AddFavorite, autocompleteWeatherData, CheckIsInFavorites, getCityDailyAndForcast, RemoveFavorite } from 'src/app/store/weather.actions';
import { getAutocompleteSelector, getCurrentDailyWeather, getCurrentWeatherForecast, getDailyLoading, getForecastLoading, getIsCelsiusDagree, isInFavorites } from 'src/app/store/weather.reducer';

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
  filteredCities$!: Observable<Autocomplete[]>;
  ilteredCities: Autocomplete[] = [];
  data$!: Observable<{
    dailyWeather: DailyWeather | undefined,
    weatherForcast: DailyForecast[] | undefined
  }>;
  currentDailyWeather: DailyWeather | undefined;
  DailyForecasts: ForecastsWeather | undefined

  isForecastLoading: boolean = false;
  isDailyLoading: boolean = false;

  isCelsios$: Observable<boolean> | undefined;

  isInFavorites$: Observable<boolean> | undefined;
  constructor(private store: Store, private weatherService: WeatherService) {
    this.store.select(getForecastLoading).subscribe(isForecastLoading => this.isForecastLoading = isForecastLoading);
    this.store.select(getDailyLoading).subscribe(isDailyLoading => this.isDailyLoading = isDailyLoading);
  }

  ngOnInit(): void {
    this.isCelsios$ = this.store.select(getIsCelsiusDagree);
    this.data$ = combineLatest(this.store.select(getCurrentDailyWeather), this.store.select(getCurrentWeatherForecast)).pipe(
      map(([dailyWeather, weatherForcast]) => ({
        dailyWeather,
        weatherForcast
      })),
    )

    this.isInFavorites$ = this.store.select(isInFavorites).pipe(
      tap(v => console.log(v))
    )

    this.filteredCities$ = this.store.select(getAutocompleteSelector).pipe(
      map(value => value || []),
    );
    // this.store.select(getForecastLoading).subscribe(loader => this.isForecastLoading = loader);
  }

  onSearch(queryString: string) {
    this.store.dispatch(autocompleteWeatherData({ querySearch: queryString }));
  }

  onSelection(autocomplete: Autocomplete | undefined) {
    if (autocomplete && autocomplete.key) {
      this.store.dispatch(getCityDailyAndForcast({ fetchedCityIndex: autocomplete.key, selected: autocomplete }))
      this.store.dispatch(CheckIsInFavorites({ fetchedCityIndex: autocomplete.key }))
    }
  }

  addToFavorite(currentDailyWeather: DailyWeather | undefined, currentWeatherForecast: DailyForecast[] | undefined) {
    if (currentDailyWeather && currentWeatherForecast)
      this.store.dispatch(AddFavorite({ favoritesDailyWeather: currentDailyWeather, currentWeatherForecast: currentWeatherForecast }))
  }

  removeFavorite(currentDailyWeather: DailyWeather | undefined,) {
    if (currentDailyWeather?.fetchedCityIndex)
      this.store.dispatch(RemoveFavorite({ fetchedCityIndex: currentDailyWeather.fetchedCityIndex }))
  }

}
