/**
 * Class to move NPCs with random moves.
 * @class MockGame
 */

 /* Custom Modules */
import simData from '../../assets/data/single_sim.json';
import {getNextCharacterPosition, checkMoves, updateCharacters, getCharacter} from '../game/GameUtil.js';

class MockGame {
    static nonPlayerCharacters = ["h2", "h3", "s1"];

    /**
     * Main method to get random moves for each character.
     * @param {array} characterState - The current state of each character.
     * @return {array} Updated character state with random moves for each character.
     */
    static getNPCMoves(characterState) {
        let newChars = [];
        let characters = characterState.slice();
        this.nonPlayerCharacters.forEach((characterId) => {
            let c = getCharacter(characters, characterId);
            let move = (c.inPlay ? this.getMove(c) : c);
            newChars.push(move);
        })

        return updateCharacters(characters, newChars);
    }

    /**
     * Generates a random number between 0 and 3
     * @return {number} Random number.
     */
    static getRandomInt() {
        return Math.floor(Math.random() * 4);
    }

    /**
     * Generates a random move for the given character.
     * @param {object} character - A character you want to randomly move.
     * @return {object} A character with an updated position.
     */
    static getRandomMove(character) {
        let move = this.getRandomInt();
        let newCharacter = getNextCharacterPosition(character, move); // return copy
        let validMoves = checkMoves(simData.map, [newCharacter]).validMoves;

        return {validMoves, newCharacter};
    }

    /**
     * Gets a move for the given character and repeats until a valid move is retrieved.
     * @param {object} character - A character you want to move.
     * @return {object} A character with an updated position.
     */
    static getMove(character) {
        let {validMoves, newCharacter} = this.getRandomMove(character);

        while(!validMoves){
            let move = this.getRandomMove(character);
            validMoves = move.validMoves;
            newCharacter = move.newCharacter;
        }

        return newCharacter;
    }
}

export default MockGame;
