/* Task.js */

import React from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Game from '../game/Game.js';
import Sidebar from '../sidebar/Sidebar.js';
// import Database from '../database/Database.js';
import './Task.css';
import Prompts from '../prompts/Prompts.js';
import Payment from '../payments/Payment.js';
import { getTaskId, updateGameData, getProgress } from './TaskUtil.js';
import starterStates from '../assets/data/starter_states.json';
// TODO: Update starter_states.json with real starting states

import task from '../assets/data/example_task.json';



/* Objective: Set up task for participants and game sequence to be completed.
    Additionally, calling the Game component to play each game in the sequence.
*/

class Task extends React.Component {
    constructor(props){
        super(props);

        // T-A-2 TODO: Call/create sequence of games (list of start states w/ maps)
        const seeds = starterStates; // seeds to create games, consist of a map and starter state pair

        const games = this.createGameSequence("p-xx", seeds);

        this.state = {
            id: "p-xx",
            seeds: seeds,
            games: games,
            startTime: new Date().toString(),
            gameCtr: 0,
            playing: false, // whether currently playing a game
            complete: false,
            endTime: "0",
            displayInstructions: true
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

    testData = () => {
        // let database = new Database();
        // database.createTask(task);
    }

    toggleDisplayInstructions = () => {
        this.setState({
            displayInstructions: !this.state.displayInstructions
        });
    }

    // T-A-5 TODO: Export and save task data (JSON -> MongoDB)
    saveGame = () => {
        console.log("saving game...");
        // let database = new Database();
        // make them redo game if they went too quickly
        let task = {
            id: "p-xx",
            startTime: this.state.startTime,
            endTime: new Date().toString(),
            games: this.state.games.slice()
        };

        console.log("task",task);

        // database.createTask(task);

        this.giveCodePayment();
    }

    // T-A-6 TODO: Give player redeemable code from pre-made list of codes
    giveCodePayment = () => {
        console.log("giving payment code...");
    }

    nextGame = (gameData) => {

        console.log("ctr", this.state.gameCtr);
        console.log(this.state.seeds.length);

        let finished = (this.state.gameCtr === this.state.seeds.length - 1);

        this.setState({
            playing: false,
            games: updateGameData(this.state.games, gameData),
            gameCtr: (!finished ? this.state.gameCtr + 1 : this.state.gameCtr),
            complete: finished

        });
    }

    // T-D-1 TODO: Send notification when new task is created (i.e. when a participant logs on)

    render(){
        const ctr = this.state.gameCtr;
        const game = this.state.games[ctr];

        // conditionally render progress bar after first game is complete
        let now = getProgress(ctr, this.state.seeds.length);
        const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
        let progressDisplay = <div/>;

        if(this.state.gameCtr > 0 && !this.state.displayInstructions){
            progressDisplay = <div className="progressBar">Task Progress{progressInstance}</div>;
         }

        // conditionally render information about the study before task is begun
        let prompt = <div/>;

        // conditionally render the sidebar instructions when game instructions aren't displayed
        let sidebar = <div/>;

        // conditionally render next game button or game space
        let display = <div/>;

        if(this.state.playing){
            // display game
            display = <Game id={game.id} map={game.map} initialCharacterState={game.initialCharacterState} toggleInstr={this.toggleDisplayInstructions} endGame={this.nextGame}/>;

            if(this.state.displayInstructions && this.state.gameCtr === 0){
                // display game prompt
                prompt = <Prompts promptLabel="gamePrompt"/>;
            }else{
                // display sidebar
                sidebar = <Sidebar />;
            }
        }else{
            if(this.state.gameCtr === 0){
                // display study info prompt
                prompt = <Prompts promptLabel="studyInfoPrompt" />;
                // display begin task button
                display = <Button variant="primary" size="lg" className="beginTaskButton" onClick={this.startGame}>Begin Study</Button>;
            }else if(this.state.gameCtr > 0){
                if(!this.state.complete){
                    // display next game
                    display = <Button variant="primary"  className="nextGameButton" onClick={this.startGame}>NEXT GAME</Button>;
                }else{
                    prompt = <Prompts promptLabel="finishedPrompt" />;
                    display = <div className="submitTask"><Payment /><Button variant="primary" onClick={this.saveGame}>Submit Task</Button></div>;
                }
            }
        }

        return(
            <div className="Task">
                <Button onClick={this.testData}></Button>
                <div className="display">
                    <div className="progressBarContainer">
                        {progressDisplay}
                    </div>

                    <div className="sidebarContainer">
                        {sidebar}
                    </div>

                    <div className="taskDisplay">
                        {prompt}
                        {display}
                    </div>
                </div>
            </div>
        )
    }

}

export default Task
