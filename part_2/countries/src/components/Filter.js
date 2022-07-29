
const Filter = ({onChange}) =>{
  const filterStyle = {
    padding:10,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
}
  const titleStyle = {
    fontSize:'2rem'
  }
  const searchStyle = {
    fontSize:'2rem'
  }
    return(
    <div style={filterStyle}>
        <h3 style={titleStyle}>Find Countries</h3>
        <input style={searchStyle} type="search" onChange={onChange} placeholder="Country Name.." />
      </div>
    )
}

export default Filter