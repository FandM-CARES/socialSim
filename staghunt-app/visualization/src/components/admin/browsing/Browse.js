/**
 * Class render library browser.
 * @class Browse
 */

/* React Modules & Components */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

/* Custom Components */
import LibraryTable from './LibraryTable.js';
import Huntspace from '../../huntspace/Huntspace.js';

/* Custom Modules */
import { createGameSequence, convertToMatrix } from '../AdminUtil.js';
import DatabaseService from '../../database/DatabaseService.js';

/* Styling */
import '../Admin.css';

const TABLE_LENGTH = 10;

class Browse extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            library: [],
            game: {},
            loadingFromDB: false,
            libraryCtr: 0,
            gameCtr: 0,
            collection: "simulations",
            viewing: false
        }
    }

    /* Library Operations */

    componentDidMount() {
        console.log("Component mounting...");
        /** @TODO: pass in whether we want to pull from siumulations or tasks */
        DatabaseService.addShelf(TABLE_LENGTH, this.state.collection)
            .then(shelf => this.addShelf(this.state.library, shelf.library));
    }

    toggleViewing = () => {
        this.setState({ viewing: !this.state.viewing });
    }

    toggleLoading = () => {
        this.setState({ loadingFromDB: !this.state.loadingFromDB });
    }

    simulate = (game) => {
        let sequence = createGameSequence(game);

        let newGame = {
            "id": game.id,
            "map": game.map,
            "state": sequence[0],
            "states": sequence
        };

        this.setState({
            game: newGame,
            gameCtr: 0,
            gameLength: sequence.length,
            viewing: true
        });
    }

    addShelf = (currentLibrary, shelf) => {
        /** Replace entire library instead of adding onto it
         * @TODO: Add support for loading games from tasks */
        let library = shelf;
        this.setState({
            library: convertToMatrix(library, TABLE_LENGTH)
        });
    }

    fetchShelf = async () => {
        this.toggleLoading();
        let ctr = this.state.libraryCtr;
        let volume = TABLE_LENGTH * Math.pow(2, (ctr < 2 ? ctr + 1 : ctr));
        await DatabaseService.addShelf(volume, this.state.collection).then(async (shelf) => {
            this.addShelf([], shelf.library);
        }).then(() => {
            this.toggleLoading();
        });
    }

    showNextShelf = () => {
        let ctr = this.state.libraryCtr;
        if(ctr < this.state.library.length - 1){
            this.setState({ libraryCtr: ctr + 1 });
        }else{
            this.fetchShelf();
        }
    };

    showPrevShelf = () => {
        let ctr = this.state.libraryCtr;
        if(ctr >= 1){
            this.setState({ libraryCtr: ctr - 1 });
        }
    };

    resetShelf = () => { this.setState({ libraryCtr: 0 }); };

    /* Game Rendering Operations */

    showNextState = () => {
        let ctr = this.state.gameCtr;
        if(ctr < this.state.gameLength - 1){
            let game = this.state.game;
            game.state = game.states[ctr + 1];
            console.log("Next state: ", ctr + 1);

            this.setState({
                gameCtr: ctr + 1,
                game: game
            });
        }
    };

    showPrevState = () => {
        let ctr = this.state.gameCtr;
        if(ctr >= 1){
            console.log("Prev state: ", ctr - 1);
            let game = this.state.game;
            game.state = game.states[ctr - 1];

            this.setState({
                gameCtr: ctr - 1,
                game: game
            });
        }
    };

    resetState = () => {
        let game = this.state.game;
        game.state = game.states[0]

        this.setState({
            gameCtr: 0,
            game: game
        });
    };

    render(){
        let gameCtr = this.state.gameCtr;
        let libraryCtr = this.state.libraryCtr;

        /** Conditionally render information */
        let prompt = <div/>;

        /** Conditionally render display */
        let display = <div/>;

        let prevButton = <div/>;
        let nextButton = <div/>;
        let resetButton = <div/>;

        let game = this.state.game;

        let library = this.state.library;
        let catalog = (libraryCtr < library.length && library.length > 0 ? library[libraryCtr] : []);

        let pageNumber = <div className="pageNumber">Page {(library.length === 0 || libraryCtr >= library.length ? 0 : libraryCtr + 1)} of {library.length}</div>;

        if(this.state.viewing){
            display = <Huntspace key={game.id} id={game.id} characters={game.state} map={game.map} stateCounter={gameCtr + 1}/>;
            prevButton = <Button key={"statePrevButton"} className="State-item default" variant="primary" disabled={gameCtr===0?true:false} onClick={this.showPrevState}>Previous</Button>;
            nextButton = <Button key={"stateNextButton"} className="State-item default" variant="primary" disabled={gameCtr===(game.states.length-1)?true:false} onClick={this.showNextState}>Next</Button>;
            resetButton = <Button key={"stateResetButton"} className="State-item default" variant="primary" disabled={gameCtr===0?true:false} onClick={this.resetState}>Reset</Button>;
        }else{
            if(this.state.loadingFromDB || library.length === 0){
                display = <Spinner className="loadingSpinner" role="status" animation="border" variant="primary" />;
            }else{
                prompt = <p>Select a simulation to view:</p>;
                display = <div className="libraryContainer"><LibraryTable key={"libraryTable"} library={catalog} visualize={this.simulate}/>{pageNumber}</div>;
            }
            prevButton = <Button key={"shelfPrevButton"} className="State-item default" variant="primary" disabled={libraryCtr===0?true:false} onClick={this.showPrevShelf}>Previous</Button>;
            nextButton = <Button key={"shelfNextButton"} className="State-item default" variant="primary" disabled={libraryCtr===(library.length)?true:false} onClick={this.showNextShelf}>{(libraryCtr===(library.length-1) ? "Load More" : "Next")}</Button>;
            // resetButton = <Button key={"shelfResetButton"} className="State-item default" variant="primary" disabled={libraryCtr===0?true:false} onClick={this.resetShelf}>Reset</Button>;
        }

        let buttonContainer = <ul className="State-items default">{prevButton}{nextButton}{resetButton}</ul>;

        let tableButton = (this.state.viewing ? <Button className="backToTableButton" variant="primary" onClick={this.toggleViewing}>Go Back to Table</Button> : <div/>);

        return(
            <div className="browserContainer">
                {tableButton}
                {prompt}
                {display}
                {buttonContainer}
            </div>
        )
    }

}

export default Browse;
