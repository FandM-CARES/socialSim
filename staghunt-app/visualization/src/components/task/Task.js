/**
 * Class to set up task for participants and game sequence to be completed.
 * Calls the Game component to play each game in the sequence.
 * @class Task
 */

/* React Modules & Components */
import React from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

/* Custom Components */
import Game from '../game/Game.js';
import Sidebar from '../sidebar/Sidebar.js';
import Prompts from '../prompts/Prompts.js';
import Payment from '../payments/Payment.js';

/* Custom Modules */
import SlackService from '../notifications/Notify.js';
import DatabaseService from '../database/DatabaseService.js';
/** @TODO: Update starter_states.json with real starting states */
import starterStates from '../../assets/data/starter_states.json';
import { updateGameData, getProgress } from './TaskUtil.js';

/* Styling */
import './Task.css';

class Task extends React.Component {

    constructor(props){
        super(props);

        /* The starter states are the seeds needed to create games.
        They consist of a map and starter state. */
        const seeds = starterStates;

        const games = this.createGameSequence("p-xx", seeds);

        this.state = {
            id: "p-xx",
            seeds: seeds,
            games: games,
            userType: this.props.userType,
            startTime: new Date().toString(),
            gameCtr: 0,
            playing: false,
            complete: false,
            endTime: "0",
            displayInstructions: true,
            showPayment: false,
            paymentCode: "0000-0000-0000"
        }
    }

    /**
     * Creates an array of each game to be played.
     * @param {number} taskId - A temporary holder id for this task.
     * @param {array} seeds - The starting states for the task.
     * @return {array} An array of games with unique id, a map, an initial state,
     * and other parameters for the Game component.
     */
    createGameSequence = (taskId, seeds) => {
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

    /**
     * Starts the game by setting the playing parameter to true.
     */
    startGame = () => {
        /** @TODO: Send notification when new task is created (i.e. when a participant logs on) */
        if(this.state.gameCtr === 0){
            SlackService.sendStart(this.state.userType);
        }
        this.setState({
            playing: true
        });
    }

    /**
     * Changes whether the game instructions prompt is supposed to be shown.
     * Called by the Game component.
     */
    toggleDisplayInstructions = () => {
        this.setState({
            displayInstructions: !this.state.displayInstructions
        });
    }

    /**
     * Saves data collected during one game and then goes to the next games
     * in the set or ends the task by setting complete to true.
     * @param {object} gameData - All the data collected from one game.
     */
    nextGame = async (gameData) => {
        let finished = (this.state.gameCtr === this.state.seeds.length - 1);

        this.setState({
            playing: false,
            games: updateGameData(this.state.games, gameData),
            gameCtr: this.state.gameCtr + 1,
            complete: finished
        });
    }

    /**
     * Exports the game to the database and initiates the payment process.
     */
    saveGame = async () => {
        let task = {
            id: "p-xx",
            startTime: this.state.startTime,
            endTime: new Date().toString(),
            games: this.state.games.slice()
        };

        let res = await DatabaseService.uploadTask(task);
        console.log("Upload Task response: ", res);
        // on successful upload
        this.setState({
            showPayment: true,
            paymentCode: (res === null || res.payment ? res.payment : "\\\\-\\\\")
        });

        SlackService.sendComplete(res.taskID);
    }

    render(){
        const ctr = this.state.gameCtr;
        const game = this.state.games[ctr];

        /** Conditionally render progress bar after first game is complete */
        let now = getProgress(ctr, this.state.seeds.length);
        const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
        let progressDisplay = <div/>;

        if(this.state.gameCtr > 0 && !this.state.displayInstructions){
            progressDisplay = <div className="progressBar">Task Progress{progressInstance}</div>;
         }

        /** Conditionally render information about the study before task is begun */
        let prompt = <div/>;

        /** Conditionally render the sidebar instructions when game instructions aren't displayed */
        let sidebar = <div/>;

        /** Conditionally render next game button or game space */
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
                    display = <div className="submitTask"><Button variant="primary" onClick={this.saveGame}>Submit Task</Button></div>;
                }
            }
        }

        if(this.state.showPayment){
            display = <div className="paymentCode">Payment Code:<Payment paymentCode={this.state.paymentCode}/></div>;
        }

        return(
            <div className="Task">
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

export default Task;
