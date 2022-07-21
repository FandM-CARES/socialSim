import React from 'react';

import './Header.css';

// 'layout-text-sidebar-reverse'
// Plug in the menu icon

class Header extends React.Component {
    render(){
      return(
        <div>
          <div className="header">
            <div className="header-left">
                <a href="#default" className="logo">Staghunt</a>
            </div>
            <div className="header-right">
                <p className="oxyHeader">
                Occidental College Undergraduate Research
                </p>
            </div>
          </div>
        </div>
      )
    }

}

export default Header
