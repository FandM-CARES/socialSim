import React from 'react';
import './Header.css';

class HeaderComponent extends React.Component {
    render(){
      return(
        <div>
          <div className="header">
            <a href="#default" className="logo">Staghunt</a>
            <div className="header-right">
            </div>
          </div>
        </div>
      )
    }

}

export default HeaderComponent
