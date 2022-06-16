/* HuntspaceComponent.js */

import React from 'react';
import Huntspace from './Huntspace.js'
import './Huntspace.css';
import simData from '../assets/data/single_sim.json'
import {createCharacterStates} from "./HuntspaceUtil.js";

class HuntspaceComponent extends React.Component {

  constructor(props){
      super(props)
      const {id, map, states} = simData;
      const stateLength = states.length;
      const characters = createCharacterStates(states);

      this.state = {
          stateCounter: 0,
          stateLength: stateLength,
          mapWidth: 1,
          characters: characters,
          currCharacters: characters[0],
          id: id,
          map: map,
      }
  }

  updateCharacterPositions = (ctr) => {
    const currChars = this.state.currCharacters.slice();
    const nextChars = this.state.characters[ctr].slice(); // not the next swequential state of characters but the next state, can be the previous state

    // update moving characters
    const charObj = {};
    currChars.forEach(
      element => {
        charObj[element.id] = element;
      }
    )
    nextChars.forEach(
      element => {
        charObj[element.id] = element;
      }
    )

    var values = Object.keys(charObj).map(function(key){
      return charObj[key];
    });

    this.setState({
      currCharacters: values,
    });
  }

  showNextState = () => {
      if(this.state.stateCounter < this.state.stateLength - 1){
          this.setState({
            stateCounter: (this.state.stateCounter + 1),
          });
          this.updateCharacterPositions(this.state.stateCounter + 1);
      }
  };

  showPrevState = () => {
      if(this.state.stateCounter >= 1){
          this.setState({
            stateCounter: (this.state.stateCounter - 1),
            currCharacters: this.state.characters[this.state.stateCounter - 1]
          });
          this.updateCharacterPositions(this.state.stateCounter - 1);
      }
  };

  resetState = () => {
    this.setState({
      stateCounter: 0,
      currCharacters: this.state.characters[0]
    });
  };

  render(){
    return(
      <div className="Huntspace">
        <Huntspace characters={this.state.currCharacters} map={this.state.map}/>
        <ul className="State-items">
          <div className="State-item default"><button disabled={this.state.stateCounter===0?true:false} onClick={this.showPrevState}>Previous</button></div>
          <div className="State-item default"><button disabled={this.state.stateCounter===(this.state.stateLength-1)?true:false} onClick={this.showNextState}>Next</button></div>
          <div className="State-item default"><button disabled={this.state.stateCounter===0?true:false} onClick={this.resetState}>Reset</button></div>
        </ul>
      </div>
    )
  };
}

export default HuntspaceComponent
