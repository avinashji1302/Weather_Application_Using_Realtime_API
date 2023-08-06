import React from 'react'
import { useState,useEffect } from 'react';
import "./Weather.css"
import DisplayWeather from './DisplayWeather';


 function Weather() {
   
    const API_KEY="f86c5099aeca38186e03df1973281cc5";

   const [form,setForm]=useState({
    city:"",
    country:"",
   });

   const[weather,setWeather]=useState({});
    function getCityName() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

        
        const data = await fetch(apiUrl).then((res)=>(res.json()).then((data)=>((data))))
        setWeather({
          data:data 
         });
      });
    } else {
      document.getElementById('result').textContent = "Geolocation is not supported by this browser.";
    }
  }

   async function weatherData(){

    if(form.city === "" && form.country === ""){
        alert("Write the city name & country name first")
    }else{
        const data =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${API_KEY}`).then((res)=>(res.json()).then((data)=>((data))))
        
      if(data !== null && data !== undefined) {
        setWeather({
         data:data 
        });
      }
   
    }

    setForm({city:"",country:""})
  
}
    useEffect(() => {
      getCityName()
    }, [])

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
      <button className='getweather' onClick={(e)=>{
        e.preventDefault()
        weatherData()}}>Submit</button>
      </form>

    {
      weather.data !== undefined ?
      <div>
         <DisplayWeather data={weather.data}  />
      </div>
    
    :null
    }
    </div>
  )
}
export default Weather;