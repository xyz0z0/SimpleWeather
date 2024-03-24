import WeatherResponse from './WeatherResponse';

interface Now {
  cloud: number;
  dew: number;
  feelsLike: number;
  humidity: number;
  icon: number;
  obsTime: string;
  precip: number;
  pressure: number;
  temp: number;
  text: string;
  vis: number;
  wind360: number;
  windDir: string;
  windScale: number;
  windSpeed: number;
}

export default interface NowWeather extends WeatherResponse {
  now: Now
}