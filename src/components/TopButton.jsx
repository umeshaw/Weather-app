import React from 'react'

function TopButton({setQuery}) {
 const cities =[
    {
        id:1,
       name:"London"
    },
    {
        id:2,
        name:"Sydney"
    },
    {
        id:3,
        name:"Tokyo"
    },
    {
        id:4,
        name:"Toronto"
    },
    {
        id:5,
       name:"Paris"
    },
 ]
 


  return (
    <div className='flex items-center justify-around my-6 '>
        {cities.map((city)=>(
<button key={city.id} 
onClick={()=>setQuery({q:city.name})}
className='px-3 py-2 text-lg font-medium text-white transition ease-in rounded-md hover:bg-gray-700'>
    {city.name}</button>
))}
    </div>
  )
}

export default TopButton