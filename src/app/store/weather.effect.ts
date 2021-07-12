import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import * as actions from './weather.actions';

import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Autocomplete } from '../models/autocomplete.model';
import { AutocompleteDTO, DailyWeather } from '../models/weather.model';
import { MapperService } from '../services/mapper.service';

@Injectable()
export class WeatherEffects {
    constructor(
        private actions$: Actions,
        private api: WeatherService,
        private storageService: StorageService,
        private mapperService: MapperService,
        private toastr: ToastrService,
    ) { }

    loadAutoCompleteData$ = createEffect(() => this.actions$.pipe(
        ofType(actions.autocompleteWeatherData),
        switchMap(({ querySearch }) => {
            return from(this.storageService.getCities(querySearch).then(
                async cities => {
                    if (cities)
                        return cities
                    const allCitiesOptions = await this.checkPreviousSearchs(querySearch).then(
                        previousSearch => this.storageService.getCities(previousSearch)
                    )
                    return allCitiesOptions ? allCitiesOptions.filter(c => c.name.toLowerCase().includes(querySearch.toLowerCase())) : null
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
            console.log(autocomplete);

            if (autocomplete) {
                return actions.autocompleteWeatherDataSuccess({ autocomplete });
            }
            this.toastr.error('An error occurred, Please try again later', 'Error!');
            return actions.autocompleteWeatherDataError()
        })
    ));

    getDailyWeather$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getDailyWeather),
        switchMap(({ fetchedCityIndex, selected }) => {
            return this.api.getDailyWeather(fetchedCityIndex)
                .pipe(
                    map((dailyWeatherData) => dailyWeatherData.map(dwDTO => this.mapperService.mapDailyWeatherDTO(dwDTO, selected))),
                    catchError(err => of(undefined))
                )
        }
        ),
        map((dailyWeatherData: DailyWeather[] | undefined) => {
            if (dailyWeatherData) {
                return actions.UpdateDailyWeather({ currentDailyWeather: dailyWeatherData[0] })
            }
            return actions.getDailyWeatherError();
        })
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