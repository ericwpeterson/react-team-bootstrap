import { Map } from 'immutable';

// Actions
export const SET_VIEWPORT  = 'grid/SET_VIEWPORT';
export const SETUP_GRID  = 'grid/SETUP';

const DEFAULT_STATE = Map({});

export let rowProps = (imageWidth, minRowMargin, gutterWidth, viewPortWidth) => {
    let limitExceeded = false;
    let numImagesPerRow = 0;
    let rowWidth = 0;

    for (let i = 1; i < 100 && !limitExceeded; i++) {

        let paddingSpace = (2 * gutterWidth) + ((i - 1) * (2 * gutterWidth));
        let w = (i * imageWidth) + (2 * minRowMargin) + paddingSpace;

        if (w > viewPortWidth) {
            limitExceeded = true;
        } else {
            numImagesPerRow = i;
            rowWidth = w;
        }
    }

    return {items: numImagesPerRow, width: rowWidth - (2 * minRowMargin)};
};

let calculateMargin = (state) => {
    let ret;

    let settings = state.toJS().settings;
    let imageWidth = settings.imageSize.width;
    let gutterWidth = settings.gutterWidth;
    let minRowMargin = settings.minRowMargin;
    let viewPortWidth = settings.viewPortWidth;

    let props = rowProps(imageWidth, minRowMargin, gutterWidth, viewPortWidth);
    let numImagesPerRow = props.items;
    let rowWidth = props.width;

    ret = state.set('numImagesPerRow', numImagesPerRow);
    ret = ret.set('rowWidth', rowWidth);

    return ret;
};

export default function monobjectReducer(state = DEFAULT_STATE, action) {
    let ret;

    switch (action.type) {

        case SET_VIEWPORT:
            ret = state.setIn(['settings', 'viewPortWidth'], action.viewPortWidth);
            ret = ret.setIn(['settings', 'viewPortHeight'], action.viewPortHeight);
            ret = calculateMargin(ret);
            return ret;

        case SETUP_GRID:
            ret = state.set('settings', action.payload);
            ret = state.set('settings', new Map(action.payload));
            ret = calculateMargin(ret);
            return ret;

        default:
            return state;
    }
}

// Action Creators

export function setViewPort(viewPortWidth, viewPortHeight) {
    return {
        type: SET_VIEWPORT,
        viewPortWidth: viewPortWidth,
        viewPortHeight: viewPortHeight
    };
}

export function setupGrid(viewPortWidth, viewPortHeight) {
    let minRowMargin = 0;
    let gutterWidth = 20;

    let imageSize = {
        width: 300,
        height: 300
    }

    if ( viewPortWidth < 400 ) {
        imageSize.width = 250;
        imageSize.height = 250;
    }

    return {
        type: SETUP_GRID,
        payload: {
            viewPortWidth: viewPortWidth,
            viewPortHeight: viewPortHeight,
            imageSize: imageSize,
            minRowMargin: minRowMargin,
            gutterWidth: gutterWidth
        }
    };
}
