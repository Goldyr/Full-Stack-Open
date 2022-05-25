import axios from 'axios'
const url = '/api/persons'

const getAll = () =>{
    const request = axios.get(url)
    return request.then(response => response.data)
}

const add = (person) =>{
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const del = (id) =>{
    const request = axios.delete(`${url}/${id}`)
    return request.then()
}

const update = (person) =>{
    console.log('update');
    const request = axios.put(`${url}/${person.id}`,person)
    return request.then(response => response.data)
}

const personsServices = {getAll,add,del,update,}

export default personsServices;