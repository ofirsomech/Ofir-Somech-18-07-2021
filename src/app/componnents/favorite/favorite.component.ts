import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DailyForecast, DailyWeather } from 'src/app/models/weather.model';
import { RemoveFavorite } from 'src/app/store/weather.actions';
import { getCurrentDailyWeather, getCurrentWeatherForecast, getFavoritesDailyWeather, getIsCelsiusDagree, isInFavorites } from 'src/app/store/weather.reducer';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoritesDailyWeather: DailyWeather[] =[];
  data$!: Observable<{
    dailyWeather: DailyWeather | undefined,
    weatherForcast: DailyForecast[] | undefined
  }>;
  isCelsios$: Observable<boolean> | undefined;
  isInFavorites$: Observable<boolean> | undefined;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isCelsios$ = this.store.select(getIsCelsiusDagree);
    this.store.select(getFavoritesDailyWeather).subscribe(favorites => this.favoritesDailyWeather = favorites);
    this.data$ = combineLatest(this.store.select(getCurrentDailyWeather), this.store.select(getCurrentWeatherForecast)).pipe(
      map(([dailyWeather, weatherForcast]) => ({
        dailyWeather,
        weatherForcast
      })),
    )

    this.isInFavorites$ = this.store.select(isInFavorites).pipe(
      tap(v => console.log(v))
    )
  }

  removeFavorite(currentDailyWeather: DailyWeather) {
    if (currentDailyWeather?.fetchedCityIndex)
      this.store.dispatch(RemoveFavorite({ fetchedCityIndex: currentDailyWeather.fetchedCityIndex }))
  }

}
