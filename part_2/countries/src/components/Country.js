import axios from 'axios'
import {useEffect, useState} from 'react'

const Country = ({country}) =>{
    //So it doesnt break on page load
    const [weather, setWeather] = useState({
        main:{
            temp:0,
        },
        wind:{
            speed:0,
        },
        weather:{
            0:{
                icon:'nan',
            }
        }
    })

    useEffect (() =>{ 
    const api_url = "https://api.openweathermap.org/data/2.5/weather?q=" + country.capital + "&appid=" + process.env.REACT_APP_API_KEY
 
    axios
    .get(api_url)
    .then(response => {
        console.log('Got the weather data.');
        setWeather(response.data);
    })
    },[country])

    return(
        <div key={country.name.common}>
            <h2>
                {country.name.common}
            </h2>
            <p>
                capital: {country.capital}
                <br></br>
                area: {country.area}
                <br></br>
                country population: {country.population}
                <br></br>
            </p>
            <b>Spoken languages:</b>
            <ul>
                {Object.values(country.languages).map((lang,i) => <li key={i}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt='flag'></img>
            <h3>Weather in {country.capital}</h3>
            <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt=" weather icon"></img>
            <p>Temperature: {parseFloat(weather.main.temp - 273.15).toPrecision(3)}°C</p>
            <p>Wind: {weather.wind.speed}</p>
        </div>
    )
}

export default Country