import {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'



const App = () => {
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([]);

  useEffect(() =>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
    setCountries(response.data);
    console.log('Got the countries data.')
    })
  } ,[])

  const filterChangeHandler = (event) =>{setShownCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))}

  const clickCountryHandler = (event) =>
  {
    event.preventDefault();
    setShownCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
        <Filter onChange={filterChangeHandler}/>
        <ul>
          <Countries countries={shownCountries} clickCountryHandler={clickCountryHandler}/>
        </ul>
    </div>
  );
}

export default App;
