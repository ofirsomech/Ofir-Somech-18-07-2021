import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';

@Pipe({
  name: 'weatherDegree'
})
export class WeatherDegreePipe implements PipeTransform {

  constructor() {
  }

  transform(value: number | undefined, ...args: any[]): string {
    const isC = args[0]
    if (value) {
      return isC ? this.getCelsiosStr(value) : this.getFStr(value);
    }
    return ""
  }

  getCelsiosStr(degrees: number): string {
    return `${degrees}C°`;
  }

  getFStr(degrees: number): string {
    let fahrenheit = Math.round((degrees * 9 / 5 + 32) * 100) / 100;
    return `${fahrenheit}F°`;
  }

}
