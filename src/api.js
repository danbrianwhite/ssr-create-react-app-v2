import { apiUrl } from './config'

class Api {
  constructor(options){
    this.apiUrl = apiUrl
    this.prefix = ''
    if (!options){
      return
    }
    const {token} = options
    this.token = token
  }
  _getJsonHeaders(){
    return {
      'Accept': 'application/json'
    }
  }
  _postJsonHeaders(){
    return {
      'Accept': 'application/json'
    , 'Content-Type': 'application/json'
    }
  }
  setToken(token){
    this.token = token
  }
  _buildQueryString(data){
    return '?' + Object.keys(data).map(d=>d+'='+encodeURIComponent(data[d]))
  }
  // Don't want to be too opinionated here, just a basic one
  _handleStatus(res){
    if (res.ok){
      return res.json()
    }
    throw new Error(res.statusText)
  }
}

export class MainApi extends Api{
  constructor(options){
    super(options)
    this.prefix = '/api'
  }
  getUser(id){
    return fetch(`${this.apiUrl}${this.prefix}/users/${id}`, {
      headers: this._getJsonHeaders()
    }).then(this._handleStatus)
  }
}
