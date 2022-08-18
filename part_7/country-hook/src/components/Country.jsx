
export const Country = ({ country }) => {
    if (!country) {
      return <div>not found...</div>
    }
  
    return (
      <div>
        <h3>{country.name}</h3>
        <div>population {country.population}</div> 
        <div>capital {country.capital}</div>
        <img src={country.flag} height='100' alt={`flag of ${country.name}`}/> 
      </div>
    )  
 
  }