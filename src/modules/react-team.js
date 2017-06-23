import { Map } from 'immutable';

export const FETCH_STATE = {
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    ERROR: 'ERROR',
    IDLE: 'IDLE',
};

// Actions
export const FETCH_COMPLETED  = 'react-team/OP_COMPLETED';
export const FETCH_STARTED    = 'react-team/FETCH_STARTED';
export const FETCH_TEAM    = 'react-team/FETCH_MEMBERS';

const DEFAULT_STATE = Map({fetchState: FETCH_STATE.IDLE, team: Map({})});

export default function monobjectReducer(state = DEFAULT_STATE, action) {
    let ret;

    switch (action.type) {

        case FETCH_COMPLETED:

            if (!action.error) {
                ret = state.set('team', action.team);
                ret = ret.set('fetchState', FETCH_STATE.COMPLETED);
            } else {
                ret = state.set('fetchState', FETCH_STATE.ERROR);
            }
            return ret;

        case FETCH_STARTED:
            ret = state.set('fetchState', FETCH_STATE.IN_PROGRESS);
            return ret;

        default:
            return state;
    }
}

// Action Creators

export function fetchTeam(url) {
    return {
        type: FETCH_TEAM,
        url: url
    };
}

export function setFetchStarted() {
    return {
        type: FETCH_STARTED
    };
}

export function setFetchCompleted(err, team) {
    return {
        type: FETCH_COMPLETED,
        error: err,
        team: team
    };
}
