import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CardComponent } from './card/card.component';
import { WeatherDegreePipe } from './pipes/weather-degree.pipe';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AutocompleteComponent,
    CardComponent,
    WeatherDegreePipe,
    LoaderComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,

  ],
  exports:[
    AutocompleteComponent,
    CardComponent,
    WeatherDegreePipe,
    MaterialModule,
    LoaderComponent
  ]
})
export class SharedModule { }
