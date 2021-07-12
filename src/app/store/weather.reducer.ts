import * as WeatherActions from './weather.actions';
import { WeatherForecast, DailyWeather } from '../models/weather.model';
import { Autocomplete } from '../models/autocomplete.model';
import { on, createReducer, Action } from '@ngrx/store';

export interface State {
  autocompleteData: Autocomplete[],


  isDailyLoading: boolean,
  isForecastLoading: boolean,
  favoritesList: number[],
  isInFavorites: boolean,

  currentDailyWeather: DailyWeather,
  currentWeatherForecast: WeatherForecast[],
  favoritesDailyWeather: DailyWeather[],
  favoritesForecastWeather: WeatherForecast[][],
}

const initialState: State = {
  currentDailyWeather: {
    // fetchedCityIndex: null,
    fetchedCityName: '',
    // dailyTemperature: null,
    weatherText: '',
    weatherIcon: ''
  },
  autocompleteData: [],
  isDailyLoading: false,
  currentWeatherForecast: [],
  isForecastLoading: false,
  favoritesList: [],
  isInFavorites: false,
  favoritesDailyWeather: [],
  favoritesForecastWeather: []
}

const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.UpdateDailyWeather, (state, action) => {
    console.log(action)
    return ({
      ...state,
      currentDailyWeather: action.currentDailyWeather,
      isDailyLoading: false
    })
  }),
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
      favoritesList: [...state.favoritesList, action.favoritesDailyWeather.fetchedCityIndex],
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
  on(WeatherActions.LoadWeatherFromFavorites, (state, action) => {
    return ({
      ...state,
      currentDailyWeather: state.favoritesDailyWeather[action.fetchedCityIndex],
      currentWeatherForecast: state.favoritesForecastWeather[action.fetchedCityIndex]
    })
  }
  ),
  on(WeatherActions.autocompleteWeatherDataSuccess, (state, action) => {
    return ({
      ...state,
      autocompleteData: action.autocomplete,
    })
  }),
  on(WeatherActions.clearAllAutocomplete, (state, action) => {
    return ({
      ...state,
      autocompleteData: [],
    })
  }),
  on(WeatherActions.getDailyWeatherSuccess, (state, action) => {
    return ({
      ...state,
      currentDailyWeather: action.city,
    })
  })
);

export function reducer(state: State = initialState, action: Action) {
  return weatherReducer(state, action);
}