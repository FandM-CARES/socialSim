/* Huntspace.js */

import React from 'react';
import RenderHuntspace from './RenderHuntspace.js'
import './Huntspace.css';

/* Objective: Render huntspace SVG when character positions are initialized
    or updated. */

class Huntspace extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          id: this.props.id,
          map: this.props.map,
          characters: this.props.characters
      };
  }

  render(){
    return(
      <div className="Huntspace">
        <h2>Your Game ID: {this.state.id}</h2>
        <RenderHuntspace characters={this.props.characters} map={this.props.map}/>
      </div>
    )
  };
}

export default Huntspace
