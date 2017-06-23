import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from '../components/Tile';

class Grid extends Component {

    render() {
        let gutter = this.props.grid.settings.gutterWidth;
        let imageHeight = this.props.grid.settings.imageSize.height;
        let imageWidth = this.props.grid.settings.imageSize.width;

        let flexGridStyle = {
            width: this.props.grid.rowWidth - (this.props.grid.numImagesPerRow * gutter),
            maxWidth: this.props.grid.rowWidth - (this.props.grid.numImagesPerRow * gutter),
            backgroundColor: 'inherit',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
        };

        let padding = this.props.grid.settings.gutterWidth;

        let tiles = this.props.reactTeam.team.map((member) => {
            let jsx = <Tile
                padding = {padding}
                avatar = {member.avatar_url}
                height = {imageHeight}
                width = {imageWidth}
                key = {member.login}
                login = {member.login }
                gitUrl = {member.html_url}
            />;
            return jsx;
        });

        return (
            <div style={flexGridStyle}>
                {tiles}
            </div>
        );
    }
}

Grid.propTypes = {
    grid: PropTypes.object.isRequired,
    reactTeam: PropTypes.object.isRequired
};

export default Grid;
