/** HuntspaceComponent.js */

import React from 'react';
import Huntspace from './Huntspace.js'
import './Huntspace.css';
import simData from '../assets/data/single_sim.json'

class HuntspaceComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            stateCounter: 0,
            stateLength: 1,
            mapWidth: 1
        }
    }

    componentDidMount(){
      this.setState({ mapWidth : simData.map[0].length, stateLength : simData.states.length });
    }

    showNextState = () => {
        if(this.state.stateCounter < this.state.stateLength - 1){
            this.setState({ stateCounter: this.state.stateCounter + 1});
        }
    };

    showPrevState = () => {
        if(this.state.stateCounter >= 1){
            this.setState({ stateCounter: this.state.stateCounter - 1});
        }
    };

    resetState = () => {
      this.setState({ stateCounter: 0});
    };

    render(){
      return(
        <div className="Huntspace">
          <Huntspace data={simData} stateData={this.state}/>
          <ul className="State-items">
            <div className="State-item default"><a type="button" disabled={this.state.stateCounter===0?true:false} onClick={this.showPrevState}>Previous</a></div>
            <div className="State-item default"><a type="button" disabled={this.state.stateCounter===(this.state.stateLength-1)?true:false} onClick={this.showNextState}>Next</a></div>
            <div className="State-item default"><a type="button" disabled={this.state.stateCounter===0?true:false} onClick={this.resetState}>Reset</a></div>
          </ul>
        </div>
      )
    };
}

export default HuntspaceComponent
