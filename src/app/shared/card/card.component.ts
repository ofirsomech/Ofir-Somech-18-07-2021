import { Component, Input, OnInit } from '@angular/core';
import { DailyForecast, DailyWeather, ForecastsWeather } from 'src/app/models/weather.model';

@Component({
  selector: 'sc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() currentDailyWeather: DailyWeather | undefined;
  @Input() isDaily = false;
  @Input() day: DailyForecast | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
