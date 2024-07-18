import React, { useState } from 'react'
import { UilSearch ,UilLocationPoint} from '@iconscout/react-unicons'

function Inputs({setQuery,setUnits}) {
    const [city,setCity]=useState("");

const handleSearchClick=()=>{
  if (city !== "") setQuery({q:city});
}
 const handleLocationClick=()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      const{latitude,longitude}=position.coords
      setQuery({lat: latitude,lon:longitude})
    })
  }
 }
    
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row items-center justify-center w-3/4 space-x-4'>
        <input
        onChange={(e)=>setCity(e.currentTarget.value)}
        type='text'
        placeholder='Search for city...'
        className='w-full p-2 text-xl font-light text-gray-500 capitalize shadow-xl focus:outline-none placeholder:lowercase'
        />
        <UilSearch
        size={25}
        className="text-white transition ease-out cursor-pointer hover:scale-125"
        onClick={handleSearchClick}
        />
        <UilLocationPoint
         size={25}
        className="text-white transition ease-out cursor-pointer hover:scale-125"
        onClick={handleLocationClick}
        />
        </div>
        <div className='flex flex-row items-center justify-center w-1/4'>
            <button name='metric' className='text-xl text-white dont-light'
            onClick={()=>setUnits("metric")}>
   ℃
            </button>
            <p className='mx-1 text-xl text-white'>|</p>
            <button name='inperial' className='text-xl text-white dont-light'
             onClick={()=>setUnits("imperial")}>
   ℉
            </button>
           
           
        </div>
    </div>
  )
}

export default Inputs