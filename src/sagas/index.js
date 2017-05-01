import { fork } from 'redux-saga/effects'
import userSaga from './user'
import API from '../api'

const api = API.create()

export default function * rootSaga() {
  yield [
    fork(userSaga(api))
  ]
}
