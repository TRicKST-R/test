import {createStore, applyMiddleware} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import {Map} from 'immutable'
import {composeWithDevTools} from 'remote-redux-devtools'
import {ajax} from 'rxjs/observable/dom/ajax'
import 'rxjs'

const fetchUserFulfilled = payload => ({
    type: 'REFRESH PLS FULFILLED',
    payload
})

const fetchUserEpic = action$ =>
    action$
        .ofType('REFRESH PLS')
        .mergeMap(action =>
            ajax.getJSON(`/sales?from=${action.from}&to=${action.to}`)
                .map((response) => fetchUserFulfilled(response)))

const initialState = new Map({
    goods: [
        {
            "title": "",
            "revenue": ""
        }
    ],
    total: ""
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH PLS FULFILLED':
            return state
                .set('goods', JSON.parse(action.payload.goods))
                .set('total', action.payload.total_revenue)
        default:
            return state
    }
}
const epicMiddleware = createEpicMiddleware(fetchUserEpic)
const enhancer = composeWithDevTools(applyMiddleware(epicMiddleware))
const store = createStore(reducer, initialState, enhancer)

export default store