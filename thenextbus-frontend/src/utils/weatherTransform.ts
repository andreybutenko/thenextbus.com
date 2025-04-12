import { ApiWeatherDetails, WeatherDetails } from '../types/WeatherData';

export function transformWeatherDetails(apiWeatherDetails: ApiWeatherDetails): WeatherDetails {
    return {
        date: new Date(apiWeatherDetails.dt * 1000),
        temp: apiWeatherDetails.temp,
        pop: apiWeatherDetails.pop,
        description: apiWeatherDetails.weather[0]?.description,
        icon: apiWeatherDetails.weather[0]?.icon,
    };
}
