import * as WeatherActions from './weather.actions';
import { DailyWeather, DailyForecast } from '../models/weather.model';
import { Autocomplete } from '../models/autocomplete.model';
import { on, createReducer, Action, createSelector, createFeatureSelector } from '@ngrx/store';

export interface State {
  autocompleteData: Autocomplete[],


  isDailyLoading: boolean,
  isForecastLoading: boolean,
  favoritesList: number[],
  isInFavorites: boolean,

  currentDailyWeather: DailyWeather,
  currentWeatherForecast: DailyForecast[],
  favoritesDailyWeather: DailyWeather[],
  favoritesForecastWeather: DailyForecast[][],
  isCelsius:boolean
  
}

const initialState: State = {
  currentDailyWeather: {
    fetchedCityName: '',
    weatherText: '',
    weatherIcon: '',
  },
  autocompleteData: [],
  isDailyLoading: false,
  currentWeatherForecast: [],
  isForecastLoading: false,
  favoritesList: [],
  isInFavorites: false,
  favoritesDailyWeather: [],
  favoritesForecastWeather: [],
  isCelsius : true
}

export const mainState = createFeatureSelector<State>("weather");

export const getAutocompleteSelector = createSelector(mainState, (s) => s.autocompleteData)
export const getCurrentDailyWeather = createSelector(mainState, (s) => s.currentDailyWeather)
export const getCurrentWeatherForecast = createSelector(mainState, (s) => s.currentWeatherForecast)
export const getForecastLoading = createSelector(mainState, (s) => s.isForecastLoading)
export const getDailyLoading = createSelector(mainState, (s) => s.isDailyLoading)
export const getFavoritesDailyWeather = createSelector(mainState, (s) => s.favoritesDailyWeather)
export const isInFavorites = createSelector(mainState, (s) => s.isInFavorites)
export const getIsCelsiusDagree = createSelector(mainState, (s) => s.isCelsius)


const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.UpdateDailyWeather, (state, action) => ({
    ...state,
    currentDailyWeather: action.currentDailyWeather,
    isDailyLoading: false
  })),
  on(WeatherActions.UpdateForecastWeather, (state, action) => ({
    ...state,
    currentWeatherForecast: action.currentWeatherForecast,
    isForecastLoading: false
  })),
  on(WeatherActions.ShowDailySpinner, state => ({
    ...state,
    isDailyLoading: true
  })),
  on(WeatherActions.ShowForecastSpinner, (state) => ({
    ...state,
    isForecastLoading: true
  })),
  on(WeatherActions.RemoveDailySpinner, state => ({
    ...state,
    isDailyLoading: false
  })),
  on(WeatherActions.RemoveForecastSpinner, (state) => ({
    ...state,
    isForecastLoading: false
  })),
  on(WeatherActions.AddFavorite, (state, action) => {
    return ({
      ...state,
      favoritesList: action.favoritesDailyWeather.fetchedCityIndex ? [...state.favoritesList, action.favoritesDailyWeather.fetchedCityIndex] : state.favoritesList,
      isInFavorites: true,
      favoritesDailyWeather: [...state.favoritesDailyWeather, action.favoritesDailyWeather],
      favoritesForecastWeather: [...state.favoritesForecastWeather, action.currentWeatherForecast]
    })
  }),
  on(WeatherActions.RemoveFavorite, (state, action) => ({
    ...state,
    favoritesList: state.favoritesList.filter(favoriteItem => {
      return favoriteItem !== action.fetchedCityIndex
    }),
    isInFavorites: false,
    favoritesDailyWeather: state.favoritesDailyWeather.filter((favoriteWeatherItem: any) => {
      return favoriteWeatherItem.fetchedCityIndex !== action.fetchedCityIndex
    }),
    favoritesForecastWeather: state.favoritesForecastWeather.filter((favoriteWeatherItem, index) => {
      return index !== state.favoritesList.indexOf(action.fetchedCityIndex)
    })
  })),
  on(WeatherActions.CheckIsInFavorites, (state, action) => ({
    ...state,
    isInFavorites: state.favoritesList.includes(action.fetchedCityIndex)
  })),
  on(WeatherActions.LoadWeatherFromFavorites, (state, action) => ({
    ...state,
    currentDailyWeather: state.favoritesDailyWeather[action.fetchedCityIndex],
    currentWeatherForecast: state.favoritesForecastWeather[action.fetchedCityIndex]
  })),
  on(WeatherActions.autocompleteWeatherDataSuccess, (state, action) => ({
    ...state,
    autocompleteData: action.autocomplete,
  })),
  on(WeatherActions.clearAllAutocomplete, (state, action) => ({
    ...state,
    autocompleteData: [],
  })),
  on(WeatherActions.getDailyWeatherSuccess, (state, action) => ({
    ...state,
    currentDailyWeather: action.city,
  })),
  on(WeatherActions.changeDegreeState, (state, action) => ({
    ...state,
    isCelsius: !state.isCelsius  }))
);

export function reducer(state: State = initialState, action: Action) {
  return weatherReducer(state, action);
}