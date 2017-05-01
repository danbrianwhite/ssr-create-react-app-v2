import { apiUrl } from './config'

class Api {
  constructor(options){
    this.apiUrl = apiUrl
    this.prefix = ''
    if (!options){
      return
    }
    const {token, prefix} = options
    this.token = token
    this.prefix = prefix
  }
  getJsonHeaders(){
    return {
      'Accept': 'application/json'
    }
  }
  postJsonHeaders(){
    return {
      'Accept': 'application/json'
    , 'Content-Type': 'application/json'
    }
  }
  setToken(token){
    this.token = token
  }
  handleUnauthed(res){
    if (res.status === 401) {
      return new Promise(()=>{})
    } else {
      return res
    }
  }
  _buildQueryString(data){
    return '?' + Object.keys(data).map(d=>d+'='+encodeURIComponent(data[d]))
  }
  parseJson(res) {
    return res.json()
  }
  checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      var error = new Error(res.statusText)
      error.response = res
      throw error
    }
  }
  get(fixture, id) {
    if(id) {
      return fetch(`${this.apiUrl}${this.prefix}/${fixture}/${id}`, this.getJsonHeaders())
        .then(this.checkStatus)
        .then(this.parseJson)
        .then(data => {
          return {ok: true, data}
        }).catch(err => {
          return {ok: false, err}
        })
    } else {
      return fetch(`${this.apiUrl}${this.prefix}/${fixture}`, this.getJsonHeaders())
        .then(this.checkStatus)
        .then(this.parseJson)
        .then(data => {
          return {ok: true, data}
        }).catch(err => {
          return {ok: false, err}
        })
    }
  }
}

const create = (prefix = '/api') => {
  const api = new Api({prefix})

  const getUser = (id) => api.get('users', id)

  return {
    getUser
  }
}

export default {
  create
}
