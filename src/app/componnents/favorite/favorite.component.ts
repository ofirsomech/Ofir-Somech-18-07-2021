import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { DailyWeather } from 'src/app/models/weather.model';
import { RemoveFavorite } from 'src/app/store/weather.actions';
import { getFavoritesDailyWeather } from 'src/app/store/weather.reducer';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoritesDailyWeather: DailyWeather[] =[];
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getFavoritesDailyWeather).subscribe(favorites => this.favoritesDailyWeather = favorites);
  }

  removeFavorite(currentDailyWeather: DailyWeather | undefined,) {
    if (currentDailyWeather?.fetchedCityIndex)
      this.store.dispatch(RemoveFavorite({ fetchedCityIndex: currentDailyWeather.fetchedCityIndex }))
  }

}
