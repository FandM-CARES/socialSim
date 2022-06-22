import React from 'react';
import Huntspace from '../huntspace/Huntspace.js';
import {createCharacterStates, getNextCharacterPositions, enforceGameRules} from '../huntspace/HuntspaceUtil.js';
import MockGame from './MockGame.js';

/* Objective: Create playable game environment give unique game id and start
    state. */

class Game extends React.Component {
    constructor(props){
        super(props);

        // props = game id, map, initialCharacterState

        let characters = createCharacterStates([this.props.initialCharacterState]);

        this.state = {
            id: this.props.id,
            map: this.props.map,
            player: characters[0][3],
            characters: characters[0], // current character state
            history: [this.props.initialCharacterState] // history of character states
        };
    }

    // G-A-1 TODO: Display board for initial start states

    // G-A-3 TODO: Update character positions
    updateCharacterPositions = (direction) => {
        console.log("updating character positions...");
        // G-A-2 TODO: Get moves of hunter (from participant) and stag (from A-star alg.)
        // Wait Until animations have finished
        let playerMove = direction.target.value;
        let player = getNextCharacterPositions(this.state.player, playerMove);
        let stag = MockGame.getMove(this.state.characters, "s1");

        // G-A-4 TODO: Enforce game rules and stop the game
        let potentialNextState = this.state.characters.slice();
        let stagIndex = potentialNextState.findIndex(character => character.id === "s1");
        let playerIndex = potentialNextState.findIndex(character => character.id === "h1");
        potentialNextState[stagIndex] = stag;
        potentialNextState[playerIndex] = player;

        // enforceGameRules(potentialNextState);

        this.setState({
          currCharacters: potentialNextState,
        });
    }

    // G-A-5 TODO: Post game questionnaire
        // TODO: CREATE QUESTION METHOD
    // G-A-6 TODO: Save game data and export to task component
    // G-B-1 TODO: Log time taken for each game

    render(){
      return(
        <div className="Game">
            <Huntspace id={this.state.id} characters={this.state.characters} map={this.state.map}/>
            <select id="playerInput" onChange={this.updateCharacterPositions}>
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
