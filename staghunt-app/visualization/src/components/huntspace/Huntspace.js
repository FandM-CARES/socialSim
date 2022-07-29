/**
 * Wrapper class to render huntspace SVG when character positions are initialized
 * or updated.
 * @class Huntspace
 */


/** @TODO: Make the huntspace more dynamic.
 * Should be able to
 * - take variable map widths and lengths
 * - have a unified input scheme
 * - be able to view and play
 * - have a mode for previewing
 * - process simulations and games to make the exported games smaller
 * - redefine the data interactions (e.g. create class for game space and characters, make methods to mutate that data)
 * - create methods for importing and exporting these games
 * - standardize the name used for each data object (e.g. characters, state, states)
 */

/**
 * @TODO: Create a huntspace interface to render huntspace given a set of inputs.
 * Handle gameplay vs. viewing.
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
    let config = this.props.config;

    /* Default Header Values */
    let showHeader = true;
    let headerSize = 24;
    let headerText = "Game #" + this.state.id.slice(-2);

    if (config && config.hasOwnProperty("header")){
        showHeader = config.header.show;
        if(showHeader){
            headerSize = config.header.size;
            headerText = config.header.text;
        }
    }

    let header = (showHeader ? <h2 style={{'fontSize': headerSize + 'pt'}}>{headerText}</h2> : <></>);

    return(
      <div className="Huntspace">
        {header}
        <RenderHuntspace characters={this.props.characters} map={this.props.map} stateCounter={this.props.stateCounter - 1} config={this.props.config}/>
      </div>
    )
  };
}

export default Huntspace;
