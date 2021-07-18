import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherEffects } from './store/weather.effect';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componnents/home/home.component';
import { FavoriteComponent } from './componnents/favorite/favorite.component';
import { NavbarComponent } from './componnents/navbar/navbar.component';
import { SharedModule } from './modules/shared/shared.module';
import { DailyWeatherCardComponent } from './componnents/daily-weather-card/daily-weather-card.component';
import { ForecastWeatherCardComponent } from './componnents/forecast-weather-card/forecast-weather-card.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoriteComponent,
    NavbarComponent,
    DailyWeatherCardComponent,
    ForecastWeatherCardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([WeatherEffects]),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
