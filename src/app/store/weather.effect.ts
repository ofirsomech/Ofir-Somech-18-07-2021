import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap, delay } from 'rxjs/operators';
import * as actions from './weather.actions';

import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Autocomplete } from '../models/autocomplete.model';
import { MapperService } from '../services/mapper.service';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class WeatherEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private api: WeatherService,
        private storageService: StorageService,
        private mapperService: MapperService,
        private toastr: ToastrService,
        private store: Store,

    ) { }

    ngrxOnInitEffects(): Action {
        return actions.getCurrentCityByGeoLocation()
    }

    loadAutoCompleteData$ = createEffect(() => this.actions$.pipe(
        ofType(actions.autocompleteWeatherData),
        switchMap(({ querySearch }) => {
            if (!querySearch)
                return of({ cities: [], querySearch })
            return from(this.storageService.getCities(querySearch).then(
                async cities => {
                    if (cities)
                        return cities
                    const allCitiesOptions = await this.checkPreviousSearchs(querySearch).then(
                        previousSearch => this.storageService.getCities(previousSearch)
                    )
                    return allCitiesOptions ? allCitiesOptions.filter(c => c.name?.toLowerCase().includes(querySearch.toLowerCase())) : null
                })
            ).pipe(
                map(cities => ({ cities, querySearch }))
            )
        }),
        switchMap(({ cities, querySearch }) => {
            if (cities)
                return of(cities)
            return this.api.getAutocompleteSearch(querySearch)
                .pipe(
                    map((autocompleteResults) => autocompleteResults.map(aDTO => this.mapperService.mapAutocompleteDTO(aDTO))),
                    tap((autocompleteData: Autocomplete[]) => this.storageService.setCities(querySearch, autocompleteData)),
                    catchError(_err => {
                        console.log(_err);
                        return of(undefined)
                    })
                )
        }),
        map((autocomplete: Autocomplete[] | undefined) => {
            if (autocomplete) {
                return actions.autocompleteWeatherDataSuccess({ autocomplete });
            }
            this.toastr.error('An error occurred, Please try again later', 'Error!');
            return actions.autocompleteWeatherDataError()
        })
    ));

    getCurrentCityMetadata$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getCurrentCityByGeoLocation),
        switchMap(() => {
            const geolocationPromise = new Promise<{ lat: number, lng: number }>((result, reject) => {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        result({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                    }, (err) => {
                        reject()
                    });
            });
            return from(geolocationPromise);
        }),
        switchMap(({ lat, lng }) => {
            return this.api.getGeolocation(lat, lng).pipe(
                map(v => ({ fetchedCityIndex: +v.Key, selected: { key: +v.Key, name: v.LocalizedName } }))
            );
        }),
        switchMap(({ fetchedCityIndex, selected }) => {
            return [actions.getCityDailyAndForcast({ fetchedCityIndex, selected })];
        })
    ));

    getDailyWeather$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getDailyWeather),
        switchMap(({ fetchedCityIndex, selected }) => {
            this.store.dispatch(actions.ShowDailySpinner());
            return this.api.getDailyWeather(fetchedCityIndex)
                .pipe(
                    map((dailyWeatherData) => dailyWeatherData.map(dwDTO => this.mapperService.mapDailyWeatherDTO(dwDTO, selected))),
                    catchError(err => of(undefined))
                )
        }),
        switchMap((dailyWeatherData) => {
            if (dailyWeatherData) {
                return [
                    actions.UpdateDailyWeather({ currentDailyWeather: dailyWeatherData[0] }),
                ]
            }
            return [actions.getDailyWeatherError()];
        })
    ));

    getForcastWeather$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getForcastWeather),
        switchMap(({ fetchedCityIndex }) => {
            this.store.dispatch(actions.ShowForecastSpinner());
            return this.api.getForecastWeather(fetchedCityIndex)
                .pipe(
                    catchError(err => of(null))
                )
        }),
        switchMap((data) => {
            if (data?.DailyForecasts) {
                return [
                    actions.UpdateForecastWeather({ currentWeatherForecast: data.DailyForecasts }),
                ]
            }
            return [actions.getDailyWeatherError()];
        })
    ));

    getCityDailyAndForcast$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getCityDailyAndForcast),
        switchMap(({ fetchedCityIndex, selected }) => {
            return [
                actions.getDailyWeather({ fetchedCityIndex, selected }),
                actions.getForcastWeather({ fetchedCityIndex, selected }),
            ]
        }),
    ));

    async checkPreviousSearchs(query: string) {
        for (let i = 0; i < query.length; i++) {
            const element = query.substr(0, i + 1);
            const cities = await this.storageService.getCities(element)
            if (cities && cities.length < 10) {
                return element;
            }
        }
        return null;
    }
}