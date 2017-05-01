import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import rootSaga from './sagas'
//import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

//const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  const middlewares = [
    sagaMiddleware
  //, logger
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(
    reducers
  , initialState
  , compose(...enhancers)
  )

  // Extensions
  sagaMiddleware.run(rootSaga)
  store.asyncReducers = {} // Async reducer registry

  if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default)
    })
  }

  return store
}
