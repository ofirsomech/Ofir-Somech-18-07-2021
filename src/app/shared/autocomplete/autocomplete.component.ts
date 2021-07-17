import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { flatMap, map, startWith, tap } from 'rxjs/operators';
import { Autocomplete } from 'src/app/models/autocomplete.model';
import { autocompleteWeatherData, getDailyWeather } from 'src/app/store/weather.actions';
import { getAutocompleteSelector } from 'src/app/store/weather.reducer';

@Component({
  selector: 'sc-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  control: FormControl = new FormControl();
  // options: Autocomplete[] | undefined = [];
  input: string = "";
  filteredOptions$!: Observable<Autocomplete[]>;
  filteredOptions: Autocomplete[] = [];
  @Input() selectedCity :Autocomplete | undefined;
  constructor(private store: Store) {
  }

  ngOnInit() {
    // this.filteredOptions
    this.filteredOptions$ = this.store.select(getAutocompleteSelector).pipe(
      map(value => value || []),
      tap(value => this.filteredOptions = value),
    );
  }
  selected(event: any) {
    const name = event.option.value;
    this.selectedCity = this.filteredOptions.find(auto => auto.name === name)
    console.log(this.selectedCity);
    
    this.store.dispatch(getDailyWeather({ fetchedCityIndex: this.selectedCity?.key, selected: this.selectedCity || { name, key: 0 } }))

  }
  search() {
    this.store.dispatch(autocompleteWeatherData({ querySearch: this.input }));
  }
  // private _filter(value: string): Autocomplete[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
}
