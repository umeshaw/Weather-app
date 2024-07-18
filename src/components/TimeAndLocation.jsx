import React from 'react';

function TimeAndLocation({ weather: { formattedLocaltime, name, country } }) {
  return (
    <div className='flex items-center justify-center my-6'>
      <div className='text-xl font-extralight'>
        <p className='text-xl text-white font-extralight'>
          {formattedLocaltime}
        </p>
        <div className='flex items-center justify-center my-3'>
          <p className='text-3xl font-medium text-white'>{`${name}, ${country}`}</p>
        </div>
      </div>
    </div>
  );
}

export default TimeAndLocation;
