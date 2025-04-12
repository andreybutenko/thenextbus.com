export type ApiWeatherDetails = {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: { id: number; main: string; description: string; icon: string }[];
    pop: number;
};

export type ApiWeatherData = {
    current: ApiWeatherDetails;
    hourly: ApiWeatherDetails[];
    daily: ApiWeatherDetails[];
};

export type WeatherDetails = {
    date: Date;
    temp: number;
    pop: number;
    description: string | undefined;
    icon: string | undefined;
};

export type WeatherData = {
    current: WeatherDetails;
    hourly: WeatherDetails[];
    daily: WeatherDetails[];
};
