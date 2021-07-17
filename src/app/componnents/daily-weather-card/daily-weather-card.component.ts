import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DailyForecast, DailyWeather } from 'src/app/models/weather.model';

@Component({
  selector: 'daily-weather-card',
  templateUrl: './daily-weather-card.component.html',
  styleUrls: ['./daily-weather-card.component.scss']
})
export class DailyWeatherCardComponent implements OnInit {
  @Input() data: {
    dailyWeather: DailyWeather | undefined,
    weatherForcast: DailyForecast[] | undefined
  } | undefined;

  @Output() addFavorite: EventEmitter<string> = new EventEmitter();
  @Output() removeFromFavorite: EventEmitter<string> = new EventEmitter();
  @Input() isCelsios: boolean | null | undefined
  @Input() currentDailyWeather: DailyWeather | undefined;
  @Input() isDaily = false;
  @Input() favoritesDailyWeather: DailyWeather | undefined;
  @Input() currentWeatherForecast: DailyForecast[] | undefined;
  @Input() isInFavorites: boolean | null = false;

  constructor() { }

  ngOnInit(): void {
  }

  addToFavorite() {
    this.addFavorite.emit();
    // if (this.currentDailyWeather && this.currentWeatherForecast)
    //   this.store.dispatch(actions.AddFavorite({ favoritesDailyWeather: this.currentDailyWeather, currentWeatherForecast: this.currentWeatherForecast }))
  }

  removeFavorite() {
    this.removeFromFavorite.emit();
    // if (this.currentDailyWeather?.fetchedCityIndex)
    //   this.store.dispatch(actions.RemoveFavorite({ fetchedCityIndex: this.currentDailyWeather.fetchedCityIndex }))
  }

}
