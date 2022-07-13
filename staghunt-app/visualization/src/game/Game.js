/* Game.js */

import React from 'react';
import Button from 'react-bootstrap/Button';

import debounce from 'lodash.debounce';
import ArrowKeysReact from 'arrow-keys-react';

import Huntspace from '../huntspace/Huntspace.js';
import Survey from '../survey/Survey.js';
import MockGame from '../companions/MockGame.js';
import Companions from '../companions/Companions.js';
import { createCharacterStates, getNextCharacterPosition, enforceGameRules, updateCharacters, checkPositions } from './GameUtil.js';

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
            playing: false,
            endTime: "0",
            participatingCharacter: "Undetermined"
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

    startGame = () => {
        // check if this is first game by looking at last two characters of game id
        if(this.state.id.slice(-2) === "00"){
            this.props.toggleInstr();
        }
        this.setState({
            playing: true
        });
    }

    updateCharacterPositions = (direction) => {
        let player = getNextCharacterPosition(this.state.player, direction);
        // Companions.getNPCMoves(this.state.characters);
        let npcMoves = MockGame.getNPCMoves(this.state.characters);
        let nextState = updateCharacters(npcMoves,[player]);

        // Enforce game rules and stop the game
        let {gameStatus, updatedCharacters} = enforceGameRules(this.state.history.length, this.state.map, nextState);

        // if the move is valid update game positions
        if(gameStatus.validMoves){
            this.setState(prevState => ({
              player: player,
              characters: updatedCharacters,
              history: prevState.history.concat([updatedCharacters]),
              getPlayerInput: true
          }));
        }

        // If the move ends the game
        if(gameStatus.gameOver){
            this.setState({
                endTime: new Date().toString()
            });
        }
    }

    // Debounce character update to prevent button spamming
    debouncedUpdateHandler = debounce(d => this.updateCharacterPositions(d), 300);

    // Stop the invocation of the debounced function
    // after unmounting
    componentWillUnmount(){
        this.debouncedUpdateHandler.cancel();
    }

    exportGame = (data) => {
        console.log("handle submit", data);
        let finishedGame = JSON.parse(JSON.stringify(this.state));
        finishedGame.participatingCharacter = data;
        this.props.endGame(finishedGame);
    }

    render(){

        let survey;
        if(this.state.endTime !== "0" && this.state.participatingCharacter === "Undetermined"){
           survey = <Survey handleSubmit={this.exportGame}/>;
        }

        let display;
        if(this.state.playing){
            display = <Huntspace id={this.state.id} characters={this.state.characters} map={this.state.map}/>;
        }else if(this.state.id.slice(-2) === "00"){
            display = <Button variant="primary" onClick={this.startGame}>Play Game</Button>;
        }else{
            this.startGame();
        }
      return(
        <div className="Game" {...ArrowKeysReact.events} tabIndex="1">
            {survey}
            {display}
        </div>
      )
    }

}

export default Game
