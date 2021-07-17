import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Mode } from './models/mode.enum';
import * as actions from "./store/weather.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather';
  ngOnInit(): void {
  }
  constructor(private store: Store) {
  }
}
