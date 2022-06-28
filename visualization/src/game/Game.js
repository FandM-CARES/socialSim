import React from 'react';
import debounce from 'lodash.debounce';
import ArrowKeysReact from 'arrow-keys-react';
import Huntspace from '../huntspace/Huntspace.js';
import MockGame from './MockGame.js';
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

    startGame = () => {
        this.setState({
            playing: true
        });
    }

    updateCharacterPositions = (direction) => {
        let player = getNextCharacterPosition(this.state.player, direction);
        let npcMoves = MockGame.getNPCMoves(this.state.characters);
        let nextState = updateCharacters(npcMoves,[player]);

        // Enforce game rules and stop the game
        let {gameStatus, updatedCharacters} = enforceGameRules(this.state.history.length, this.state.map, nextState);

        // If the move is valid
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

    runQuestion = () => {
        return "h2";
    }

    exportGame = () => {
        let finishedGame = JSON.parse(JSON.stringify(this.state));
        finishedGame.participatingCharacter = this.runQuestion();
        this.props.endGame(finishedGame);
    }

    checkStatus = () => {
        if(this.state.endTime !== "0" && this.state.playing){
            setTimeout(this.exportGame, 1000);
        }
    }

    render(){
        this.checkStatus();

        let display;
        if(this.state.playing){
            display = <Huntspace id={this.state.id} characters={this.state.characters} map={this.state.map}/>;
        }else{
            display = <button onClick={this.startGame}>Play Game</button>;
        }
      return(
        <div className="Game" {...ArrowKeysReact.events} tabIndex="1">
            {display}
        </div>
      )
    }

}

export default Game
