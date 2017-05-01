import * as userActions from '../actions/user'
import * as userTypes from '../types/user'
import { call, put, takeLatest } from 'redux-saga/effects'

function * getUser(api, {id}) {
  if(!id) {
    yield put(userActions.reset())
  } else {
    const response = yield call(api.getUser, id)

    if(response.ok) {
      yield put(userActions.set(response.data))
    } else {
      yield put(userActions.reset())
    }
  }
}

const userSaga = (api) => {
  return function * () {
    yield [
      takeLatest(userTypes.REQUEST, getUser, api)
    ]
  }
}

export default userSaga
