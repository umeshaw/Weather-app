import React from 'react';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FaThermometerEmpty } from 'react-icons/fa';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

function TempAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    speed,
    sunrise,
    sunset,
    humidity,
    feels_like,
  } = {}, // Default to an empty object to avoid destructuring errors
}) {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: 'Real Feel',
      value: feels_like !== undefined ? `${feels_like.toFixed()}°` : 'N/A',
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: 'Humidity',
      value: humidity !== undefined ? `${humidity.toFixed()}%` : 'N/A',
    },
    {
      id: 3,
      Icon: FiWind,
      title: 'Wind',
      value: speed !== undefined ? `${speed.toFixed()} km/h` : 'N/A',
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: 'Sunrise',
      value: sunrise || 'N/A',
    },
    {
      id: 2,
      Icon: GiSunset,
      title: 'Sunset',
      value: sunset || 'N/A',
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: 'High',
      value: temp_max !== undefined ? `${temp_max.toFixed()}°` : 'N/A',
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: 'Low',
      value: temp_min !== undefined ? `${temp_min.toFixed()}°` : 'N/A',
    },
  ];

  return (
    <div>
      <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
        <p>{details}</p>
      </div>
      <div className='flex flex-row items-center justify-between py-3'>
        <img src={icon} alt='weather icon' />
        <p className='text-5xl text-white'>{temp !== undefined ? `${temp.toFixed()}°` : 'N/A'}</p>
        <div className='flex flex-col items-start space-y-3 text-white'>
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div key={id} className='flex items-center justify-center text-sm font-light'>
              <Icon className='mr-1' size={18} />
              {`${title}`} <span className='ml-1 font-medium'>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-row items-center justify-center py-3 space-x-10 text-sm text-white'>
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className='flex flex-row items-center'>
            <Icon size={30} />
            <p className='ml-1 font-light'>
              {`${title}:`}
              <span className='ml-1 font-medium'>{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempAndDetails;
