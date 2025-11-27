export interface ForecastDay {
	date: Date
	date_epoch: number
	day: {
		condition: {
			code: number
			text: string
			icon: string
		}
		avgtemp_c: number
		avgtemp_f: number
		maxtemp_c: number
		maxtemp_f: number
		mintemp_c: number
		mintemp_f: number
		maxwind_kph: number
		maxwind_mph: number
		avghumidity: number
		avgvis_km: number
		avgvis_miles: number
		totalprecip_mm: number
		totalprecip_in: number
		totalsnow_cm: number
		daily_chance_of_rain: number
		daily_chance_of_snow: number
		daily_will_it_rain: number
		daily_will_it_snow: number
		uv: number
	}
}

export interface WeatherData {
	location: {
		name: string
		country: string
		localtime: string
	}
	current: {
		gust_kph: string
		vis_km: string
		dewpoint_c: string
		precip_mm: string
		feelslike_c: string
		wind_dir: string
		cloud: string
		pressure_mb: string
		temp_c: number
		wind_kph: number
		humidity: number
		condition: {
			text: string
			icon: string
		}
	}
	forecast: {
		forecastday: ForecastDay[]
	}
}

export interface WeatherError {
	error: {
		code: number
		message: string
	}
}
