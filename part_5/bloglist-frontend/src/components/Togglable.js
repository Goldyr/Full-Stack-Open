import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props,refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return{
            toggleVisibility
        }
    })

    return(
        <div>
            <div style={hideWhenVisible}>
                <button style={ { backgroundColor:'#EC994B', width:'6rem', height:'2rem', margin:5 } } onClick={toggleVisibility} id={props.buttonId}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} >
                {props.children}
                <button onClick={toggleVisibility} id={props.buttonId} style={ { backgroundColor:'#FF0000', width:'6rem', height:'2rem', margin:5 } }>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName= 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable