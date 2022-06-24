import React from 'react';
import debounce from 'lodash.debounce';
import ArrowKeysReact from 'arrow-keys-react';
import Huntspace from '../huntspace/Huntspace.js';
import MockGame from './MockGame.js';
import {createCharacterStates, getNextCharacterPosition, enforceGameRules, updateCharacters} from './GameUtil.js';

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
            history: [this.props.initialCharacterState], // history of character states
            startTime: new Date().toString(),
            endTime: "0",
            participatingCharacter: "None"
        };

        ArrowKeysReact.config({
          left: () => {
            this.debouncedUpdateHandler(3);
          },
          right: () => {
            this.debouncedUpdateHandler(1);
          },
          up: () => {
            this.debouncedUpdateHandler(0);
          },
          down: () => {
            this.debouncedUpdateHandler(2);
          }
        });
    }

    updateCharacterPositions = (direction) => {
        // G-A-2 TODO: Get moves of hunter (from participant) and stag (from A-star alg.)
        let player = getNextCharacterPosition(this.state.player, direction);
        let npcMoves = MockGame.getNPCMoves(this.state.characters);
        let nextState = updateCharacters(npcMoves,[player]);

        // Enforce game rules and stop the game
        let {gameStatus, updatedCharacters} = enforceGameRules(this.state.history.length, this.state.map, nextState);

        let newHistory = this.state.history.slice();
        newHistory.push(updatedCharacters);

        if(!gameStatus.validMoves){
            console.log("Make a legal move.");
        }else if (!gameStatus.gameOver){
            this.setState({
              player: player,
              characters: updatedCharacters,
              history: newHistory,
              getPlayerInput: true
            });
        }else{
            this.setState({
                endTime: new Date().toString()
            },
           this.compileGameData);
        }
    }

    // Debounce character update to prevent button spamming
    debouncedUpdateHandler = debounce(d => this.updateCharacterPositions(d), 300);

    // Stop the invocation of the debounced function
    // after unmounting
    componentWillUnmount(){
        this.debouncedUpdateHandler.cancel();
    }

    compileGameData = () => {
        // G-A-5 TODO: Post game questionnaire
            // TODO: CREATE QUESTION METHOD
        alert("who were you trying to participate with?");
        let questionnaireAnswer = "h1";

        this.setState({
            participatingCharacter: questionnaireAnswer
        },
        this.exportGame);
    }

    exportGame = () => {
        let finishedGame = {};
        Object.assign(finishedGame, this.state);
        this.props.endGame(finishedGame);
    }

    render(){
      return(
        <div className="Game" {...ArrowKeysReact.events} tabIndex="1">
            <Huntspace id={this.state.id} characters={this.state.characters} map={this.state.map}/>
        </div>
      )
    }

}

export default Game
