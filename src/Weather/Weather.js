import React from 'react'
import { useState } from 'react';
import "./Weather.css"
import DisplayWeather from './DisplayWeather';


 function Weather() {
   
    const API_KEY="f86c5099aeca38186e03df1973281cc5";

   const [form,setForm]=useState({
    city:"",
    country:"",
   });

   const[weather,setWeather]=useState("");


   async  function weatherData(e){
      
    e.preventDefault();

    if(form.city===""){
        alert("write the city name")
    }else{
        const data =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${API_KEY}`).then((res)=>(res.json()).then((data)=>(data)))

        

        setWeather({
         data:data 
        });
   
    }

    setForm({city:"",country:""})
    

}
   const handleChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

     if(name==="city"){
        setForm({...form ,city:value})
     }

     if(name==="country"){
        setForm({...form ,country:value})
     }
   
   }
  

  
  return (
    <div className='weather'>
       <span className='title'>Weather App </span> 

       <br/>

      <form>

      <input  type="text" name="city" placeholder="City" onChange={handleChange} value={form.city} />
      <input  type="text" name="country" placeholder="Country" onChange={handleChange} value={form.country} />
      <button className='getweather' onClick={(e)=>weatherData(e)}>Submit</button>
      </form>

    {
      weather.data!==undefined ?
      <div>
         <DisplayWeather data={weather.data}  />
      </div>
    
    :null
    }
    </div>
  )
}
export default Weather;