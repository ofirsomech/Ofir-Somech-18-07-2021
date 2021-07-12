import { Injectable } from '@angular/core';
import { Autocomplete } from '../models/autocomplete.model';
import { AutocompleteDTO, DailyWeather, DailyWeatherDTO } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class MapperService {


  constructor() { }

  mapAutocompleteDTO(auto: AutocompleteDTO): Autocomplete {
    return {
      key: +auto.Key,
      name: auto.LocalizedName,
    }
  }

  mapDailyWeatherDTO(dw: DailyWeatherDTO, selected: Autocomplete): DailyWeather {
    return {
      fetchedCityIndex: selected.key,
      fetchedCityName: selected.name,
      dailyTemperature: dw.Temperature.Metric.Value,
      weatherText: dw.WeatherText,
      weatherIcon: dw.WeatherIcon < 10 ? (0 + (dw.WeatherIcon).toString()) : (dw.WeatherIcon).toString()
    }
  }
}