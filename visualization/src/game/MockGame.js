import simData from '../assets/data/single_sim.json';
import {createCharacterStates} from '../huntspace/HuntspaceUtil.js';

const {id, map, states} = simData;
const characterStates = createCharacterStates(states);

class MockGame {
    static getMove(currCharacters, characterId) {
        for(let i=0; i < characterStates.length; i++){
            let isCurrentState = JSON.stringify(currCharacters) === JSON.stringify(characterStates[i]);
            if(isCurrentState){
                return characterStates[i+1].find(character => character.id === characterId); // TODO: Fix possible out of bounds error
            }
        }
        return null;
    }
}

export default MockGame
