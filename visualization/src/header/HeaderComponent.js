import React from 'react';
import './Header.css';

class HeaderComponent extends React.Component {
    render(){
      return(
        <div>
          <div className="header">
            <a href="#default" className="logo">Staghunt</a>
            <div className="header-right">
              <a className="active" href="#home">Home</a>
              <a href="#contact">Contact</a>
              <a href="#about">About</a>
            </div>
          </div>
        </div>
      )
    }

}

export default HeaderComponent
