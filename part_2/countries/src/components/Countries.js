import Country from './Country'

const Countries = ({countries, clickCountryHandler}) =>{

    
    if(countries.length > 10){
        return(<div>Too many results, please be more specific on the filter</div>)
    }
    else if(countries.length === 1){
        return(<Country country={countries[0]}/>)
    }
    else if(countries.length === 0){
        return(<div>There is no country with that name, check spelling.</div>)
    }
    else if(countries.length >= 2 || countries.length <=10){
        return(
            countries.map(country => (
            <li key={country.name.common}>
                <p>{(country.name.common)}</p>
                <button type="button" onClick={clickCountryHandler} value={country.name.common}>button</button>
            </li>
            ))
        )
    }
} 

export default Countries