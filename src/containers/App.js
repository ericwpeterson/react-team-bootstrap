import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTeam, FETCH_STATE } from '../modules/react-team';
import { setViewPort, setupGrid } from '../modules/grid';

import Grid from '../components/Grid';
import Header from '../components/Header';

let mainContainerStyle = {
    minHeight: window.innerHeight,
    height: window.height,
    backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingTop: 30
};

let flexColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flexStart',
    justifyContent: 'center'
};

class App extends Component {

    componentDidMount() {
        window.addEventListener('resize', () => this.props.setViewPort(window.innerWidth,window.innerHeight));

        this.props.setupGrid(window.innerWidth, window.innerHeight);
        this.props.fetchReactTeam('https://api.github.com/orgs/reactjs/members');
    }

    render() {

        let reactTeam = this.props.reactTeam.toJS();
        let grid = this.props.grid.toJS();
        let mainJSX;

        if (reactTeam.fetchState === FETCH_STATE.IN_PROGRESS) {
            mainJSX =
                <div>
                    Loading...
                </div>;
        } else if (reactTeam.fetchState === FETCH_STATE.COMPLETED) {
            mainJSX =
                <Grid
                    reactTeam={this.props.reactTeam.toJS()}
                    grid = {this.props.grid.toJS()}
                />;
        } else if (reactTeam.fetchState === FETCH_STATE.ERROR) {
            mainJSX =
                <div>
                    There was an error fetching the members.
                </div>;
        } else if (grid.hasOwnProperty('settings')) {
            mainJSX =
            <Grid
                reactTeam={this.props.reactTeam.toJS()}
                grid = {grid}
            />;
        }

        return (
            <div style={flexColumnStyle}>
                <Header />
                <div style={mainContainerStyle}>
                    {mainJSX}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reactTeam: state.reactTeam,
        grid: state.grid
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReactTeam: (url) => {
            dispatch(fetchTeam(url));
        },
        setViewPort: (width, height) => {
            dispatch(setViewPort(width, height));
        },
        setupGrid: (width, height) => {
            dispatch(setupGrid(width, height));
        }
    };
};

const AppContainer = connect(mapStateToProps,mapDispatchToProps)(App);
export default AppContainer;
