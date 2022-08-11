import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer.js'


const Filter = (props) => {

    const handleChange = (event) => {
      props.setFilter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  const ConnectedFilter = connect(null , {setFilter})(Filter)
  export default ConnectedFilter