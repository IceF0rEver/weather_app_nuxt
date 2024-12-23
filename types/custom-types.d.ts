export interface LocationType {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    current: boolean;
  }
export interface WeatherApiResponse {
    name: string;
    sys: {
      country: string;
    };
    dt : nomber;
    main: {
      temp: number;
      humidity: number;
    };
    weather: [{
      description: string;
      icon: string;
    }];
  }