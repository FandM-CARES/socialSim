import { createCharacterStates, enforceGameRules, updateCharacters } from '../game/GameUtil.js';

function getDisjointCharacters(setA, setB) {
   let disjointChars = [];

   setA.forEach((character) => {
       if(setB.filter(function(e) { return e.id === character.id; }).length === 0){
           disjointChars.push(character);
       }
   });

   return disjointChars;
}

function reconciliateStates(states, addRemovalTag) {
    let characterSequence = JSON.parse(JSON.stringify(states));

    for(let i=0; i < characterSequence.length - 1; i++){
        let stateA = characterSequence[i];
        let stateB = characterSequence[i + 1];

        let disjointChars = getDisjointCharacters(stateA, stateB);
        disjointChars.forEach((character) => {
            let newCharacter = JSON.parse(JSON.stringify(character));
            if(addRemovalTag){
                newCharacter["tag"] = ["temp"];
            }
            stateB.push(newCharacter);
        });
    }

    return characterSequence;
}

function removeCharactersWithTag(state, tag){
    let newState = [];
    state.forEach((character) => {
        if(!character.hasOwnProperty("tag") || (character.hasOwnProperty("tag") && !character.tag.includes(tag))){
            newState.push(character);
        }
    });
    return newState;
}

function removeTagFromSet(states, tag){
    let originalStates = JSON.parse(JSON.stringify(states)); // make a deep copy
    let newStates = [];

    originalStates.forEach((state) => {
        let newState = removeCharactersWithTag(state, tag);
        newStates.push(newState);
    });
    return newStates;
}

function enforceLogic(map, states) {
    let characterSequence = states.slice();
    let updatedSequence = [];

    characterSequence.forEach((characterSet) => {
        let {gameStatus, updatedCharacters} = enforceGameRules(0, map, characterSet, false);
        if(!gameStatus){
            console.log("Bad game state: ", updateCharacters);
        }
        updatedSequence.push(updatedCharacters);
    });

    return updatedSequence;
}

/**
 * Creates a sequence of states that can be passed to the Huntspace component.
 * Update the values of game data for each state (e.g. adjust points) and give
 * each character game data (i.e. display data {groupSize, groupId, size, x, y},
 * inPlay, points.
 * @param {object} game - A game state object.
 * return {array} The sequence of states to be played.
 */
export const createGameSequence = (game) => {
    if(!game.hasOwnProperty("states")){
        console.log("Game did not have a 'states' attribute.");
        return game;
    }

    let characterSequence = createCharacterStates(game.states);
    characterSequence = reconciliateStates(characterSequence, true);
    characterSequence = enforceLogic(game.map, characterSequence);

    characterSequence = removeTagFromSet(characterSequence, "temp");
    characterSequence = reconciliateStates(characterSequence, false);

    return characterSequence;
}

export const createPreviewState = (game) => {
    if(!game.hasOwnProperty("states")){
        console.log("Game did not have a 'states' attribute.");
        return game;
    }

    let characterSequence = createCharacterStates([game.states[0]]);
    characterSequence = enforceLogic(game.map, characterSequence);

    return characterSequence[0];
}

export const getCharacters = (game) => {
    let characters = Object.keys(game.states[0]);
    let display = "";
    characters.forEach((character) => {
        display += (character + " ");
    });
    return display;
}

export const convertToMatrix = (array, rowLength) => {
    let matrix = [];
    let holderArr = [];
    let rowCtr = 0;

    for(let i = 0; i < array.length; i++){
        let value = array[i];
        holderArr.push(value);
        if(i != 0 && i % (rowLength - 1) === 0){
            rowCtr += 1;
            matrix.push(JSON.parse(JSON.stringify(holderArr)));
            holderArr = [value];
        }
    }

    return matrix;
}
