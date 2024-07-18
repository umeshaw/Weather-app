import { DateTime, FixedOffsetZone } from "luxon";

const API_KEY ='df20992fd3519a12705ab1bb08388fe4';
const BASE_URL ='https://api.openweathermap.org/data/2.5/';

const getWeatherData=  (infoType, searchParams)=>{
    const url = new URL (BASE_URL + infoType);
    url.search  = new URLSearchParams({...searchParams, appid: API_KEY });
      return fetch(url) .then((res)=>res.json())
};

const formatToLocalTime =(
secs,
offset,
format="cccc, dd LLL, yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset,{zone:"utc"}).toFormat(format);
const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png` 
  
     const formatCurrent =(Data)=>{
        const {
            coord:{lon,lat},
            main:{temp,feels_like,temp_min,temp_max,},
            name,
            dt,
            sys:{ country,sunrise,sunset},
            weather,
            wind:{speed},
            timezone,
        } =Data;
  

       const {main:details,icon}=weather[0];
       const formattedLocaltime=formatToLocalTime(dt,timezone);
       return{
                 temp,
                 feels_like,
                 temp_min,
                 temp_max,
                 name,
                 country,
                 speed,
                sunrise:formatToLocalTime(sunrise,timezone, 'hh:mm a'),
                sunset:formatToLocalTime(sunset,timezone,'hh:mm a'),
                details,
               icon:iconUrlFromCode(icon),
               formattedLocaltime,
               dt,
               timezone,
               lat,
               lon,
           }
           
     };


     const formatForecastWeather = (secs, offset, data) => {
        // hourly
        const hourly = data
            .filter((f) => f.dt > secs)
            .map((f) => ({
                temp: f.main.temp,
                title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
                icon: iconUrlFromCode(f.weather[0].icon),
                data: f.dt_txt,
            }))
            .slice(0, 5);
    
        // daily
        const daily = data
            .filter((f) => f.dt_txt && f.dt_txt.endsWith("00:00:00"))
            .map((f) => ({
                temp: f.main.temp,
                title: formatToLocalTime(f.dt, offset, 'ccc'),
                icon: iconUrlFromCode(f.weather[0].icon),
                data: f.dt_txt,
            }));
    
        return { hourly, daily };
    };

    const getFormattedWeartherData = async (searchParams) => {
        const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent);
        const { dt, lat, lon, timezone } = formattedCurrentWeather;
        const formattedForecastWeather = await getWeatherData("forecast", {
            lat, lon, units: searchParams.units
        }).then((d) => formatForecastWeather(dt, timezone, d.list));
    
        return { ...formattedCurrentWeather, ...formattedForecastWeather };
    }
    

export default getFormattedWeartherData
