export interface WeatherData {
  dailyWeather: DailyWeather | undefined;
  weatherForcast: DailyForecast[] | undefined;
}
export interface DailyWeatherDTO {
  LocalObservationDateTime: Date;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType?: any;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}

export interface AutocompleteDTO {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: Country;
  AdministrativeArea: AdministrativeArea;
}

export interface ForecastsWeather{
  Headline: Headline;
  DailyForecasts: DailyForecast[];
}

export interface DailyWeather {
  fetchedCityIndex?: number,
  fetchedCityName?: string,
  dailyTemperature?: number,
  weatherText?: string,
  weatherIcon?: string,
}

export interface Country {
  ID: string;
  LocalizedName: string;
}

export interface AdministrativeArea {
  ID: string;
  LocalizedName: string;
}



export interface Metric {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Imperial {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Temperature {
  Metric: Metric;
  Imperial: Imperial;
}

export interface Headline {
  EffectiveDate: Date;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate?: any;
  EndEpochDate?: any;
  MobileLink: string;
  Link: string;
}

export interface Minimum {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Maximum {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Temperature {
  Minimum: Minimum;
  Maximum: Maximum;
}

export interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export interface Night {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export interface DailyForecast {
  Date: Date;
  EpochDate: number;
  Temperature: Temperature;
  Day: Day;
  Night: Night;
  Sources: string[];
  MobileLink: string;
  Link: string;
}





