import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';





@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
    
  ]
})
export class MaterialModule { }
