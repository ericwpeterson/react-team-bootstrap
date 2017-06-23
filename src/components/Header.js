//import ReactLogo from '../images/React-icon.svg.png';
import ReactLogo from '../logo.svg';
import React, { Component } from 'react';

let headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
};

class Header extends Component {
    render() {
        return (
          <div style = {headerStyle}>
              <img alt='React Team' width={113} height={80} src={ReactLogo} />
              <h1 style={{fontSize: '2em'}} > React Team </h1>
          </div>
        );
    }
}

export default Header;
