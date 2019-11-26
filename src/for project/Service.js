import axios from 'axios'

const root = 'http://localhost:8080'
const api = `${root}/contactinfo`

class Service{

    ReadAll(){
        return axios.get(`${api}`)
    }

    DeleteById(id){
        return axios.delete(`${api}/${id}`)
    }

    POST(object){
        return axios.post(`${api}/`,object)
    }

    PUT(object,id){

        return axios.put(`${api}/${id}`,object)
    }
}

export default new Service()