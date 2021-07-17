import { Component, Input, OnInit } from '@angular/core';
import { DailyForecast } from 'src/app/models/weather.model';

@Component({
  selector: 'forecast-weather-card',
  templateUrl: './forecast-weather-card.component.html',
  styleUrls: ['./forecast-weather-card.component.scss']
})
export class ForecastWeatherCardComponent implements OnInit {
  @Input() day: DailyForecast | undefined
  @Input() isCelsios: boolean | null | undefined


  constructor() { }

  ngOnInit(): void {
  }

}
