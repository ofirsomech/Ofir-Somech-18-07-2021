import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { Autocomplete } from '../models/autocomplete.model';
import { AutocompleteDTO, DailyWeatherDTO, ForecastsWeather } from '../models/weather.model';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherAPIKey = environment.weatherAPIKey;
  private apiDaily = environment.apiDaily;
  private apiAutocomplete = environment.apiAutocomplete;
  private apiForecast = environment.apiForecast;
  private apiGeoLocation = environment.apiGeoLocation;

  constructor(private http: HttpClient) { }

  getAutocompleteSearch(searchedQuery: string): Observable<AutocompleteDTO[]> {
    return this.http.get<AutocompleteDTO[]>(`${this.apiAutocomplete}?apikey=${this.weatherAPIKey}&q=${searchedQuery}`);
  }

  getDailyWeather(fetchedCityIndex: any): Observable<DailyWeatherDTO[]> {
    return this.http.get<DailyWeatherDTO[]>(`${this.apiDaily}/${fetchedCityIndex}?apikey=${this.weatherAPIKey}`);
  }

  getForecastWeather(fetchedCityIndex: any): Observable<ForecastsWeather> {
    return this.http.get<ForecastsWeather>(`${this.apiForecast}/${fetchedCityIndex}?apikey=${this.weatherAPIKey}&metric=true`);
  }

  getGeolocation(latitude: any, longitude: any):Observable<any> {
    return this.http.get(`${this.apiGeoLocation}?apikey=${this.weatherAPIKey}&q=${latitude},${longitude}&toplevel=true`);
  }

}