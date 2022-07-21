/**
 * Wrapper class to render huntspace SVG when character positions are initialized
 * or updated.
 * @class Huntspace
 */

 /* React Modules & Components */
import React from 'react';

/* Custom Components */
import RenderHuntspace from './RenderHuntspace.js'

/* Styling */
import './Huntspace.css';

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
        <h2>Game #{this.state.id.slice(-2)}</h2>
        <RenderHuntspace characters={this.props.characters} map={this.props.map} stateCounter={this.props.stateCounter - 1}/>
      </div>
    )
  };
}

export default Huntspace;
