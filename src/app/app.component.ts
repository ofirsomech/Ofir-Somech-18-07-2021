import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from "./store/weather.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.store.dispatch(actions.autocompleteWeatherData({querySearch:"tel a"}));
   }
  constructor(private store:Store){
  }
  title = 'weather';

  
}
