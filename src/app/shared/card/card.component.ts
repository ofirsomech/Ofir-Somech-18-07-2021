import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DailyForecast, DailyWeather, ForecastsWeather } from 'src/app/models/weather.model';
import { isInFavorites } from 'src/app/store/weather.reducer';
import * as actions from "../../store/weather.actions";

@Component({
  selector: 'sc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() currentDailyWeather: DailyWeather | undefined;
  @Input() isDaily = false;
  @Input() day: DailyForecast | undefined
  @Input() favoritesDailyWeather: DailyWeather | undefined;
  @Input() currentWeatherForecast: DailyForecast[] | undefined;
  isInFavorites$: Observable<boolean> | undefined;
  isNotInFavorites$: Observable<boolean> | undefined;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isInFavorites$ = this.store.select(isInFavorites)
    this.isNotInFavorites$ = this.store.select(isInFavorites).pipe(map(isIn => !isIn))
  }

  addToFavorite() {
    if (this.currentDailyWeather && this.currentWeatherForecast)
      this.store.dispatch(actions.AddFavorite({ favoritesDailyWeather: this.currentDailyWeather, currentWeatherForecast: this.currentWeatherForecast }))
  }

  removeFavorite() {
    if (this.currentDailyWeather?.fetchedCityIndex)
      this.store.dispatch(actions.RemoveFavorite({fetchedCityIndex:this.currentDailyWeather.fetchedCityIndex}))
  }

}
