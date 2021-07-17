import { WeatherDegreePipe } from './weather-degree.pipe';

describe('WeatherDegreePipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherDegreePipe();
    expect(pipe).toBeTruthy();
  });
});
