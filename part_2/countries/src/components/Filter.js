
const Filter = ({onChange}) =>{
    return(
    <div>
        <h3>Find Countries</h3>
        <input type="search" onChange={onChange} />
      </div>
    )
}

export default Filter