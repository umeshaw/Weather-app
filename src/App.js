
import './App.css';

import TopButton from './components/TopButton';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormatWeartherData from './services/weatherService';
import { useEffect, useState } from 'react';

function App() {

const [query,setQuery]=useState({q:'sri lanka'})
const [units,setUnits]=useState('metric')
const[weather,setweather]=useState(null)
  
  const getWeather =async()=>{
    await getFormatWeartherData( {...query,units}).then(data=>{
      setweather(data)
    });
    
  };
  useEffect(()=>{
    getWeather();
  },[query,units]);
   const formatackground=()=>{
    if (!weather) return " from-cyan-700 to-blue-700"
    const threshold =units ==="metric" ? 20:60;
    if(weather.temp <= threshold)return "from-cyan-600 to from-cyan-700 to-blue-700" 
    return"from-yellow-600 to-orange-700"
   };
  
  return (
   
    <div className={`max-w-screen-md px-32 py-5 mx-auto mt-4 shadow-xl bg-gradient-to-br h-fit shadow-gray-400 ${formatackground()}`}>
   <TopButton setQuery={setQuery}/>
   <Inputs setQuery={setQuery}/>
 {
  weather && (
    <>
     <TimeAndLocation weather={weather}/>
   <TempAndDetails weather={weather}/>
   <Forecast title="3 hour step forecast" data={weather.hourly}/>
   <Forecast title="daily step forecast" data={weather.daily}/>
    </>
  )
 }

    </div>
  );
}

export default App;
