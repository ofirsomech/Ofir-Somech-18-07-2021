import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Autocomplete } from 'src/app/models/autocomplete.model';

@Component({
  selector: 'sc-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  control: FormControl = new FormControl();
  input: string = "";
  // filteredOptions$!: Observable<Autocomplete[]>;
  @Input() filteredOptions: Autocomplete[] | null | undefined;
  @Input() selectedCity: Autocomplete | undefined;
  @Output() onSelection: EventEmitter<Autocomplete | undefined> = new EventEmitter();
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selected(event: any) {
    const name = event.option.value;
    this.selectedCity = this.filteredOptions?.find(auto => auto.name === name)
    this.onSelection.emit(this.selectedCity)
  }

  search() {
    this.onSearch.emit(this.input)
  }
}
