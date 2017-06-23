import {createStore, applyMiddleware, combineReducers} from 'redux';
import reactTeamReducer from './modules/react-team';
import gridReducer from './modules/grid';
import rootSaga from './react-team-saga';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

let reducers = combineReducers({reactTeam: reactTeamReducer, grid: gridReducer});

const sagaMiddleware = createSagaMiddleware();

export default function makeStore() {
    const store = createStore(reducers, composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    ));

    sagaMiddleware.run(rootSaga);
    return store;
}
