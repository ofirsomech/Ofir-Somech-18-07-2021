import { createAction, props } from '@ngrx/store';
import { DailyWeather, DailyForecast } from '../models/weather.model';
import { Autocomplete } from '../models/autocomplete.model';
import { City } from '../models/location.model';

const UPDATE_DAILY_WEATHER = 'UPDATE_DAILY_WEATHER';
const SHOW_DAILY_SPINNER = 'SHOW_DAILY_SPINNER';
const UPDATE_FORECAST_WEATHER = 'UPDATE_FORECAST_WEATHER';
const SHOW_FORECAST_SPINNER = 'SHOW_FORECAST_SPINNER';
const REMOVE_DAILY_SPINNER = 'REMOVE_DAILY_SPINNER';
const REMOVE_FORECAST_SPINNER = 'REMOVE_FORECAST_SPINNER';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const CHECK_IS_IN_FAVORITES = 'CHECK_IS_IN_FAVORITES';
const LOAD_WEATHER_FROM_FAVORITES = 'LOAD_WEATHER_FROM_FAVORITES';
const AUTOCOMPLETE_WEATHER_DATA = "AUTOCOMPLETE_WEATHER_DATA";
const AUTOCOMPLETE_WEATHER_DATA_SUCCESSS = "AUTOCOMPLETE_WEATHER_DATA_SUCCESSS"
const AUTOCOMPLETE_WEATHER_DATA_ERROR = "AUTOCOMPLETE_WEATHER_DATA_ERROR"
const GET_DAILY_WEATHER = "GET_DAILY_WEATHER"
const GET_DAILY_WEATHER_SUCCESS = "GET_DAILY_WEATHER_SUCCESS"
const GET_DAILY_WEATHER_ERROR = "GET_DAILY_WEATHER_ERROR"
const CLEAR_AUTO_COMPLETE = "CLEAR_AUTO_COMPLETE"



export const UpdateDailyWeather = createAction(
  UPDATE_DAILY_WEATHER,
  props<{ currentDailyWeather: DailyWeather }>()
);

export const ShowDailySpinner = createAction(
  SHOW_DAILY_SPINNER
);

export const UpdateForecastWeather = createAction(
  UPDATE_FORECAST_WEATHER,
  props<{ currentWeatherForecast: DailyForecast[] }>()
);

export const ShowForecastSpinner = createAction(
  SHOW_FORECAST_SPINNER
);

export const RemoveDailySpinner = createAction(
  REMOVE_DAILY_SPINNER
);

export const RemoveForecastSpinner = createAction(
  REMOVE_FORECAST_SPINNER
);

export const AddFavorite = createAction(
  ADD_FAVORITE,
  props<{
    favoritesDailyWeather: DailyWeather,
    currentWeatherForecast: DailyForecast[]
  }>()
);

export const RemoveFavorite = createAction(
  REMOVE_FAVORITE,
  props<{ fetchedCityIndex: number }>()
);


export const CheckIsInFavorites = createAction(
  CHECK_IS_IN_FAVORITES,
  props<{ fetchedCityIndex: number }>()
);

export const LoadWeatherFromFavorites = createAction(
  LOAD_WEATHER_FROM_FAVORITES,
  props<{ fetchedCityIndex: number }>()
);

export const autocompleteWeatherData = createAction(
  AUTOCOMPLETE_WEATHER_DATA,
  props<{ querySearch: string }>()
);

export const autocompleteWeatherDataSuccess = createAction(
  AUTOCOMPLETE_WEATHER_DATA_SUCCESSS,
  props<{ autocomplete: Autocomplete[] }>()
);

export const autocompleteWeatherDataError = createAction(
  AUTOCOMPLETE_WEATHER_DATA_ERROR
);

export const getDailyWeather = createAction(
  GET_DAILY_WEATHER,
  props<{ fetchedCityIndex: number, selected: Autocomplete }>()
);

export const getDailyWeatherSuccess = createAction(
  GET_DAILY_WEATHER_SUCCESS,
  props<{ city: City }>()
);

export const getDailyWeatherError = createAction(
  GET_DAILY_WEATHER_ERROR
);

export const getCurrentCityByGeoLocation = createAction(
  "getCurrentCityByGeoLocation",
);

// export const getForecastWeatherSuccess = createAction(
//   "getForecastWeather SUCCESS",
//   props<{ city: City }>()
// );

// export const getForecastWeatherError = createAction(
//   "getForecastWeather ERROR"
// );


export const clearAllAutocomplete = createAction(
  CLEAR_AUTO_COMPLETE
);




