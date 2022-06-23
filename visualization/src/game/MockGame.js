import simData from '../assets/data/single_sim.json';
import {getNextCharacterPosition, checkMoves, updateCharacters, getCharacter} from './GameUtil.js';

class MockGame {
    static nonPlayerCharacters = ["h2", "h3", "s1"];

    static getNPCMoves(characterState) {
        let newChars = [];
        let characters = characterState.slice();
        this.nonPlayerCharacters.forEach((characterId) => {
            let c = getCharacter(characters, characterId)
            let move = (c.inPlay ? this.getMove(c) : c);
            newChars.push(move);
        })
        return updateCharacters(characters, newChars);
    }

    static getRandomInt() {
        return Math.floor(Math.random() * 4);
    }

    static getRandomMove(character) {
        // generates a random move for a character
        let move = this.getRandomInt();
        let newCharacter = getNextCharacterPosition(character, move);
        let validMoves = checkMoves(simData.map, [newCharacter]).validMoves;
        return {validMoves, newCharacter};
    }

    static getMove(character) {
        // generates a random move for a character
        let {validMoves, newCharacter} = this.getRandomMove(character);

        while(!validMoves){
            let move = this.getRandomMove(character);
            validMoves = move.validMoves;
            newCharacter = move.newCharacter;
        }

        return newCharacter;
    }
}

export default MockGame
