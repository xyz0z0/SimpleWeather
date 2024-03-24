import Now from './NowWeather';

export default interface WeatherResponse {
  code: string;
  fxLink: string;
  refer: {
    license: string[];
    sources: string[];
  };
  updateTime: string;
}