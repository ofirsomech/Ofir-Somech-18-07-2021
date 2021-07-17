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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { AutocompleteComponent } from './shared/autocomplete/autocomplete.component';
import { HomeComponent } from './componnents/home/home.component';
import { CardComponent } from './shared/card/card.component';
import { FavoriteComponent } from './componnents/favorite/favorite.component';
import { NavbarComponent } from './componnents/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    HomeComponent,
    CardComponent,
    // LoaderComponent,
    FavoriteComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([WeatherEffects]),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
