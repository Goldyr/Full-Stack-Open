import Country from './Country'

const Countries = ({countries, clickCountryHandler}) =>{


    const countriesStyle = {
        listStyle:'none',
        padding:10,
        display:'flex',
        flexDirection: 'column',
    }
    const liStyle = {
        fontSize: '1.5rem',
        padding:5,
        margin:2,
        border:'solid black 1px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
    const buttonStyle = {
        backgroundColor: 'whitesmoke',
        height: '5rem',
        width: '6rem',
    }

    const messageStyle = {
        padding: 10,
        margin: 10,
        fontSize: 20,
        border: 'black solid 1px'
    }


    if(countries.length > 10){
        return(<div style={messageStyle}>Too many results, please be more specific on the filter</div>)
    }
    else if(countries.length === 1){
        return(<Country country={countries[0]}/>)
    }
    else if(countries.length === 0){
        return(<div style={messageStyle}>There is no country with that name, check spelling.</div>)
    }
    else if(countries.length >= 2 || countries.length <=10){
        return(
            <div style={countriesStyle}>
                {countries.map(country => (
                <li key={country.name.common} style={liStyle}>
                    <p>{(country.name.common)}</p>
                    <button type="button" onClick={clickCountryHandler} value={country.name.common} style={buttonStyle}>info</button>
                </li>
                ))
                }
            </div>
        )
    }
} 

export default Countries