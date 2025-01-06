export interface LocationType {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    current: boolean;
  }
export interface WeatherApiResponse {
  slice(arg0: number, arg1: number): WeatherApiResponse;
  forEach(arg0: (item: WeatherApiResponse) => void): {data : WeatherData};
    name: string;
    sys: {
      country: string;
    };
    list: {
    }
    dt: number;
    main: {
      temp: number;
      humidity: number;
      temp_min: number;
      temp_max: number;
    };
    weather: [{
      description: string;
      icon: string;
    }];
  }

export interface WeatherData{
  dt: string;
  temp_min: number;
  temp_max: number;
  humidity: string;
  icon: string;
  }
  export interface WeatherDataHourlyChart{
    dt: string;
    Température: number;
    }