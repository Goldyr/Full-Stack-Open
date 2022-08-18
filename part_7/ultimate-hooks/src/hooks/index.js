import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(()=>{
    axios.get(baseUrl)
        .then(response => {
            setResources(response.data)
        })
        .catch(error => console.log(error))
  },[baseUrl])
    

  const create = (resource) => {
    axios.post(baseUrl,resource)
        .then(response => {
            let newObject = response.data
            setResources(resources.concat(newObject))
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error
        })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}