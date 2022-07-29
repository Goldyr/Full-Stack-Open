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

    const countryStyle = {
        padding:10,
        display:'flex',
        flexDirection:'column',
        alignItems: 'center'
    }

    const imgStyle = {
        maxHeight:'320px',
        maxWidth: '240px',
    }

    return(
        <div key={country.name.common} style={countryStyle}>
            <h2 style={{fontSize:'2.5rem'}}>
                {country.name.common}
            </h2>
            <img style={imgStyle} src={country.flags.png} alt='flag'></img>
            <p>
                <b>capital:</b> {country.capital}
                <br></br>
                <b>area:</b> {country.area}
                <br></br>
                <b>country population:</b> {country.population}
                <br></br>
            </p>
            <b>Spoken languages:</b>
            <ul>
                {Object.values(country.languages).map((lang,i) => <li key={i}>{lang}</li>)}
            </ul>
            <h3>Weather in {country.capital}</h3>
            <img style={imgStyle} src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt=" weather icon"></img>
            <p style={{padding:'0',margin: 0}}>Temperature: {parseFloat(weather.main.temp - 273.15).toPrecision(3)}°C</p>
            <p style={{padding:'0',margin: 0}}>Wind: {weather.wind.speed}</p>
        </div>
    )
}

export default Country