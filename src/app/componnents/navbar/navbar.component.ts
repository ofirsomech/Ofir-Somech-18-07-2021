import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { changeDegreeState } from 'src/app/store/weather.actions';
import { getIsCelsiusDagree } from 'src/app/store/weather.reducer';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCelsios: boolean = true;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getIsCelsiusDagree).subscribe(celsios => this.isCelsios = celsios);
  }

  changeDagree(){
    this.store.dispatch(changeDegreeState());
  }
}
