import React from 'react';
import Huntspace from '../huntspace/Huntspace.js';
import {createCharacterStates, getNextCharacterPosition, enforceGameRules, updateCharacters} from './GameUtil.js';
import MockGame from './MockGame.js';

/* Objective: Create playable game environment give unique game id and start
    state. */

class Game extends React.Component {
    constructor(props){
        super(props);

        let characters = createCharacterStates([this.props.initialCharacterState]);
        
        this.state = {
            id: this.props.id,
            map: this.props.map,
            player: characters.slice()[0][3],
            characters: characters.slice()[0], // current character state
            history: [this.props.initialCharacterState] // history of character states
        };
    }

    updateCharacterPositions = (direction) => {
        // G-A-2 TODO: Get moves of hunter (from participant) and stag (from A-star alg.)
        let player = getNextCharacterPosition(this.state.player, direction.target.value); // player, playerMove
        let npcMoves = MockGame.getNPCMoves(this.state.characters); // holds game state with new character positions
        let nextState = updateCharacters(npcMoves,[player]);

        // Enforce game rules and stop the game
        let {validMoves, updatedCharacters} = enforceGameRules(this.state.history.length, this.state.map, nextState);

        if(validMoves){
            this.setState({
              player: player,
              characters: updatedCharacters,
            });
        }else{
            alert("Please make a legal move.");
        }
    }

    // G-A-5 TODO: Post game questionnaire
        // TODO: CREATE QUESTION METHOD
    // G-A-6 TODO: Save game data and export to task component
    // G-B-1 TODO: Log time taken for each game

    render(){
      return(
        <div className="Game">
            <Huntspace id={this.state.id} characters={this.state.characters} map={this.state.map}/>
            <select id="playerInput" placeholder="Select Move" allowclear="true" onChange={this.updateCharacterPositions}>
                <option value="0">UP</option>
                <option value="1">RIGHT</option>
                <option value="2">DOWN</option>
                <option value="3">LEFT</option>
            </select>
        </div>
      )
    }

}

export default Game
