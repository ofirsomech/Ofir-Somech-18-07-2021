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
  mode = Mode.Light;
  ngOnInit(): void {
  }
  constructor(private store: Store) {
  }

  switchMode(mode: Mode) {
    if (mode === Mode.Light) {
      document.querySelector('body')?.style.setProperty('--bg-color', '#272727');
      document.querySelector('body')?.style.setProperty('--text-color', '#f8fafb');
      this.mode = Mode.Dark;
    } else {
      document.querySelector('body')?.style.setProperty('--bg-color', '#f8fafb');
      document.querySelector('body')?.style.setProperty('--text-color', '#272727');
      this.mode = Mode.Light;
    }
  }

}
