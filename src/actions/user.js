import { REQUEST, SET, RESET } from '../types/user'

export function request(id) {
  return {
    type: REQUEST,
    id
  }
}

export function set(payload){
  return {
    type: SET
  , payload
  }
}

export function reset(){
  return {
    type: RESET
  }
}
