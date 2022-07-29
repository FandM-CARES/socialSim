/**
 * Create playable game environment give unique game id and start state.
 * @class Game
 */

 /* React Modules & Components */
import React from 'react';
import Button from 'react-bootstrap/Button';

/* External Modules */
import debounce from 'lodash.debounce';
import ArrowKeysReact from 'arrow-keys-react';

/* Custom Components */
import Survey from '../survey/Survey.js';
import Huntspace from '../huntspace/Huntspace.js';
import PointsTable from '../points/PointsTable.js';

/* Custom Modules */
import GameService from './GameService.js';
import { createCharacterStates, getNextCharacterPosition, enforceGameRules, updateCharacters } from './GameUtil.js';

class Game extends React.Component {
    constructor(props){
        super(props);

        let characters = createCharacterStates([this.props.initialCharacterState]);

        /** The character attribute holds the current positions of each
         * character. */
        this.state = {
            id: this.props.id,
            map: this.props.map,
            player: characters.slice()[0][3],
            characters: characters.slice()[0],
            history: [this.props.initialCharacterState],
            startTime: new Date().toString(),
            playing: false,
            endTime: "0",
            participatingCharacter: "Undetermined",
            displayPlayButton: false
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

    componentDidMount(){
        // check if this is first game by looking at last two characters of game id
        if(this.state.id.slice(-2) === "00"){
            this.setState({
                displayPlayButton: true
            });
        }else{
            this.setState({
                playing: true
            });
        }
    }

    /**
     * Begins the game by setting the playing attribute to true.
     * Checks to see if this is the first game in a task, if it is, then it
     * removes the game instructions from the screen.
     */
    startGame = () => {
        // check if this is first game by looking at last two characters of game id
        if(this.state.id.slice(-2) === "00"){
            this.props.toggleInstr();
        }
        this.setState({
            playing: true
        });
    }

    /**
     * Changes the position of each character. The player's position comes from
     * arrow-key inputs while NPC's moves come from an external module (e.g
     * companions via GameService).
     * @param {number} direction - Numerical representation of where the player
     * wants to go.
     */
    updateCharacterPositions = (direction) => {
        let player = getNextCharacterPosition(this.state.player, direction);
        let npcMoves = GameService.getNPCMoves(this.state.characters);
        let nextState = updateCharacters(npcMoves,[player]);

        /** Enforce game rules and stop the game, if finished */
        let {gameStatus, updatedCharacters} = enforceGameRules(this.state.history.length, this.state.map, nextState, true);

        /** If all moves are valid, then update game positions */
        if(gameStatus.validMoves){
            this.setState(prevState => ({
              player: player,
              characters: updatedCharacters,
              history: prevState.history.concat([updatedCharacters]),
              getPlayerInput: true
          }));
        }

        /** If the move ends the game, begin the process to end game. */
        if(gameStatus.gameOver){
            this.setState({
                endTime: new Date().toString()
            });
        }
    }

    /** Debounce character update to prevent button spamming. */
    debouncedUpdateHandler = debounce(d => this.updateCharacterPositions(d), 300);

    /** Stop the invocation of the debounced function after unmounting */
    componentWillUnmount(){
        this.debouncedUpdateHandler.cancel();
    }

    /**
     * Sends the game data back to the Task component using a callback after the
     * survey is completed.
     * @param {string} data - The character the player was trying to collaborate
     * with.
     */
    exportGame = (data) => {
        let finishedGame = JSON.parse(JSON.stringify(this.state));
        finishedGame.participatingCharacter = data;
        this.props.endGame(finishedGame);
    }

    render(){

        let survey;
        if(this.state.endTime !== "0" && this.state.participatingCharacter === "Undetermined"){
           survey = <Survey handleSubmit={this.exportGame}/>;
        }

        let display = <div/>;
        let pointsDisplay = <div/>;

        if(this.state.playing){
            pointsDisplay = <PointsTable characters={this.state.characters} />;
            display = <Huntspace id={this.state.id} characters={this.state.characters} map={this.state.map} stateCounter={this.state.history.length}/>;
        }else if(this.state.displayPlayButton){
            display = <Button variant="primary" onClick={this.startGame}>Play Game</Button>;
        }

      return(
        <div className="GameContainer">
            {survey}
            <div className="GameItems">
                <div className="GameSpace" {...ArrowKeysReact.events} tabIndex="1">
                    {display}
                </div>
                {pointsDisplay}
            </div>
        </div>
      )
    }

}

export default Game;
