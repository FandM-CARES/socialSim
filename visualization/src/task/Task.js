import React from 'react';

import Game from '../game/Game.js';
import { getTaskId, updateGameData } from './TaskUtil.js';
import starterStates from '../assets/data/starter_states.json';
// TODO: Update starter_states.json with real starting states


/* Objective: Set up task for participants and game sequence to be completed.
    Additionally, calling the Game component to play each game in the sequence.
*/

class Task extends React.Component {
    constructor(props){
        super(props);
        // T-A-1 TODO: Create unique task id
        const taskId = getTaskId();

        // T-A-2 TODO: Call/create sequence of games (list of start states w/ maps)
        const seeds = starterStates; // seeds to create games, consist of a map and starter state pair

        const games = this.createGameSequence(taskId, seeds);

        this.state = {
            id: taskId,
            seeds: seeds,
            games: games,
            gameCtr: 0,
            playing: false, // whether currently playing a game
            complete: false
        }

    }

    createGameSequence = (taskId, seeds) => {
        console.log("beginning task...");
        let games = [];
        for(let i=0; i < seeds.length; i++){
            let seed = seeds[i];
            let gameId = taskId + "-" + (i < 10 ? "0" + i : i);
            let game = {
                "id": gameId,
                "initialCharacterState": seed.state,
                "map": seed.map,
                "data": null,
                "complete": false
            };
            games.push(game);
        }
        return games;
    }

    startGame = () => {
        this.setState({
            playing: true
        });
    }

    // T-A-5 TODO: Export and save task data (JSON -> MongoDB)
    saveGame = () => {
        console.log("saving game...");
    }

    // T-A-6 TODO: Give player redeemable code from pre-made list of codes
    giveCodePayment = () => {
        console.log("giving payment code...");
    }

    nextGame = (gameData) => {

        let finished = (this.state.gameCtr === this.state.seeds.length - 1);

        this.setState({
            playing: false,
            games: updateGameData(this.state.games, gameData),
            gameCtr: (!finished ? this.state.gameCtr + 1 : this.state.gameCtr),
            complete: finished

        });
    }

    // T-B-1 TODO: Create UI for pre-start app layout

    // T-C-1 TODO: Redeemable code isn't working
        // Backup code, if issued code hasn't been redeemed
    // T-C-2 TODO: Game won't start/Game issues

    // T-D-1 TODO: Send notification when new task is created (i.e. when a participant logs on)
    // T-D-2 TODO: Log time taken for completing the task

    render(){
        const ctr = this.state.gameCtr;
        const game = this.state.games[ctr];
        // conditionally render next button
        let button;
        if(!this.state.playing && this.state.gameCtr === 0){
            button = <button onClick={this.startGame}>START NEW GAME</button>;
        }else if(!this.state.playing && this.state.gameCtr > 0 && !this.state.complete){
            button = <button onClick={this.startGame}>NEXT GAME</button>;
        }else{
            button = <div/>;
        }

        let gameContainer;
        if(this.state.playing && this.state.gameCtr > -1){
            gameContainer = <Game id={game.id} map={game.map} initialCharacterState={game.initialCharacterState} endGame={this.nextGame}/>;
        }else if(!this.state.playing && this.state.gameCtr === 0){
            gameContainer = <div>Let's Begin!</div>;
        }else if(this.state.complete){
            gameContainer = <div>Finished!</div>;
        }else{
            gameContainer = <div/>;
        }

        return(
            <div className="Task">
                <h2>Task</h2>
                {gameContainer}
                {button}
            </div>
        )
    }

}

export default Task
