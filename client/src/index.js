import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Map} from 'immutable'
import {composeWithDevTools} from 'remote-redux-devtools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'typeface-roboto'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState = new Map({
    goods: [
        {
            "title": "Artificial Flowers",
            "revenue": "1492174.22"
        },
        {
            "title": "Baked Goods",
            "revenue": "911531.92"
        },
        {
            "title": "Bamboo",
            "revenue": "1190146.30"
        }
    ],
    total: "136976488.19"
})
const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools({ realtime: true})()
)

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
