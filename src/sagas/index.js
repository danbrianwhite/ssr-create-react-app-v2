import { fork } from 'redux-saga/effects'
import userSaga from './user'
import { MainApi } from '../api'

const api = new MainApi()

export default function * rootSaga() {
  yield [
    fork(userSaga(api))
  ]
}
