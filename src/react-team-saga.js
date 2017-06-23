import { take, call, put } from 'redux-saga/effects';

import {
    setFetchStarted,
    setFetchCompleted,
    FETCH_TEAM }
from './modules/react-team.js';

export let fetchTeam = (url) => {
    return new Promise(resolve => {
        fetch(url).then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            // Examine the text in the response
            response.json().then((data) => {
                resolve(data);
            });
        });
    });
};

export function* watchFetchTeam() {
    while (true) {
        const action = yield take(FETCH_TEAM);

        try {
            yield put(setFetchStarted());
            let team = yield call(fetchTeam, action.url);
            yield put(setFetchCompleted(false, team));
        } catch (e) {
            yield put(setFetchCompleted(e));
            console.log('err = ', e);
        }
    }
}

export default function* reactTeamSaga() {
    yield [
        watchFetchTeam()
    ];
}
