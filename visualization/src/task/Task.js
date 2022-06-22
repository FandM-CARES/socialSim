import React from 'react';

import Game from '../game/Game.js';
import { getTaskId } from './TaskUtil.js';
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
            playing: false // whether currently playing a game
        }

    }

    /* game object:{
        "id": person-00-00
        "moves":[],
        "timeSpent": 1, // (in mins)
       }
       TODO: Add variables for questionnaire data
    */

    // componentDidMount() {
    //     // this.createGameSequence();
    //     // T-A-3 TODO: Conduct game for each start state
    //     console.log("beginning task...");
    //     const seeds = this.state.seeds;
    //     let games = [];
    //     for(let i=0; i < seeds.length; i++){
    //         // T-A-3 TODO: Conduct game for each start state
    //         let seed = seeds[i];
    //         let gameId = this.state.taskId + "-" + (i < 10 ? "0" + i : i);
    //         let game = {
    //             "id": gameId,
    //             "initialCharacterState": seed.state,
    //             "map": seed.map
    //         };
    //         console.log("subgame",game);
    //         games.push(game);
    //         // <Huntspace id={gameId} map={seed.map} initialCharacterState={seed.state} />
    //         // T-A-4 TODO: Save necessary game data
    //     }
    //
    //     console.log("games", games);
    //
    //     this.setState({
    //       gameCtr: 0,
    //       games: games,
    //     });
    // }

    createGameSequence = (taskId, seeds) => {
        // T-A-3 TODO: Conduct game for each start state
        console.log("beginning task...");
        // const seeds = this.state.seeds;
        let games = [];
        for(let i=0; i < seeds.length; i++){
            // T-A-3 TODO: Conduct game for each start state
            let seed = seeds[i];
            let gameId = taskId + "-" + (i < 10 ? "0" + i : i);
            let game = {
                "id": gameId,
                "initialCharacterState": seed.state,
                "map": seed.map
            };
            games.push(game);
            // <Huntspace id={gameId} map={seed.map} initialCharacterState={seed.state} />
            // T-A-4 TODO: Save necessary game data
        }
        return games;
    }

    // T-A-5 TODO: Export and save task data (JSON -> MongoDB)
    saveGame = () => {
        console.log("saving game...");
    }

    // T-A-6 TODO: Give player redeemable code from pre-made list of codes
    giveCodePayment = () => {
        console.log("giving payment code...");
    }

    // TODO: Define a callback function for when transitioning between games
    nextGame = () => {
        // update the playing and game ctr
        console.log("going to game " + this.state.gameCtr + 1);
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
        if(this.state.playing){
            button = <button>NEXT GAME</button>;
        }else{
            button = <div/>;
        }

        let gameContainer;
        if(this.state.gameCtr > -1){
            gameContainer = <Game id={game.id} map={game.map} initialCharacterState={game.initialCharacterState} />;
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
