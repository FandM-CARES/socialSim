/**
 * Set of helper functions for the game related operations.
 * @utility GameUtil
 */

/** GAME SETUP METHODS */

/**
 * Gives the starting  points for a character.
 * Helper method for createCharacterStates.
 * @param {string} charType - The type of character.
 * @return {number} The number of points a character should beging the game with,
 * corresponding to their character type.
 */
function initializePoints(charType) {
    switch(charType){
        case "r":
            return 1;
        case "s":
            return 10;
        case "h":
            return 0;
        default:
            console.warn("Could not set an initial point value for character type: ", charType);
            return 0;
    }
}


/**
 * Creates a list of characters from starting game data.
 * Uses a copy of the stateData object.
 * @param {object} stateData - A JSON object that initializes characters given
 * the starting state, map, and beginning character positions.
 * @return {array} Instantiated list of characters.
 */
export const createCharacterStates = (stateData) => {
  const states = stateData.slice();
  const characters = [];
    states.forEach(function (configFileState) {
        const state = [];
        for (const [configFileCharId, configFileLoc] of Object.entries(configFileState)) {
            state.push({
                id: configFileCharId,
                type: configFileCharId[0],
                x: configFileLoc[0],
                y: configFileLoc[1],
                points: initializePoints(configFileCharId[0]),
                inPlay: true,
                displayData : {
                    groupSize: 1,
                    groupId: 0,
                    size: 0.07,
                    x: configFileLoc[0],
                    y: configFileLoc[1]
                }
            });
        }
        characters.push(state);
    });
    return characters;
};


/** GAME LOGIC METHODS */

/**
 * Updates the points of a group depending on which characters are present.
 * Helper method for handleInteraction.
 * Uses a copy of the group object.
 * @param {array} group - A subset of characters that are at the same position.
 * @return {array} A group with updated points.
 */
export const updatePoints = (group) => {
    // update the points earned by each character
    const characterDict = {
        'r': [],
        's': [],
        'h': []
    };
    group.forEach((character) => {
        characterDict[character.type].push(character);
    });

    let numHares = characterDict['r'].length;
    let numStags = characterDict['s'].length;
    let numHunters = characterDict['h'].length;

    // only a single hunter can claim a hare
    for (let i = 0; i < numHares && numHunters > 0; i++) {
        characterDict['h'][i%numHunters].points += 1;
        characterDict['r'][i].points -= 2;

        characterDict['h'][i%numHunters].inPlay = false;
        characterDict['r'][i].inPlay = false;
    }

    // only two hunters can claim a stag
    for (let i = 0; numHunters > 1 && i < numStags; i++) {
        characterDict['h'][i%numHunters].points += 5;
        characterDict['h'][(i+1)%numHunters].points += 5;
        characterDict['s'][i].points -= 11;

        characterDict['h'][i%numHunters].inPlay = false;
        characterDict['h'][(i+1)%numHunters].inPlay = false;

        if(characterDict['r'].length > 0){
            characterDict['r'][i].inPlay = false;
        }
    }

    const updatedSubGroups = Object.keys(characterDict).map(function(key){
        return characterDict[key];
    });

    const updatedGroup = [].concat.apply([], updatedSubGroups);

    return updatedGroup;
}

/**
 * Scale the way characters are displayed so there is no overlap; given group,
 * reassign x, y, and s to scale characters.
 * Helper method for handleInteraction.
 * Mutates group object directly.
 * @param {array} group - A subset of characters that are at the same position.
 * @return {array} A group with updated scale factors.
 */
export const scaleDisplay = (group) => {
    let x = group[0].x;
    let numCharacters = group.length;
    let interval = 1 / numCharacters;

    for(let i = 0; i < numCharacters; i++){
        if(i !== group[i].displayData.groupId){
            console.log("Warning: Order of group has changed!");
        }
        group[i].displayData.x = (x - 0.25) + (interval * i);
        group[i].displayData.size = 0.07 * 2 * (interval); // 2 = scaling constant
    }

    return group;
}

/**
 * Takes a group and assigns them a size and id.
 * Helper method for handleInteraction.
 * Uses a copy of the groupArr object.
 * @param {array} groupArr - A subset of characters that are at the same position.
 * @return {array} A group with updated group data.
 */
 function intakeGroup(groupArr) {
    let group = groupArr.slice();
    let groupSize = group.length;
    for(let i=0; i < groupSize; i++){
        group[i].displayData.groupSize = groupSize;
        group[i].displayData.groupId = i;
        if(group[i].hasOwnProperty("tag")){
            delete group[i].tag
        }
    }
    return group;
}

/**
 * Handles the interaction of a group of characters.
 * Uses a copy of the group object from intakeGroup().
 * @param {array} groupArr - A subset of characters that are at the same position.
 * @return {array} A group with updated group data, points, and scale factors.
 */
function handleInteraction(group){
    let updatedGroup = intakeGroup(group);
    updatedGroup = updatePoints(updatedGroup);
    updatedGroup = scaleDisplay(updatedGroup);
    return updatedGroup;
}

/**
 * Reverts all the display variables and points for a set of characters.
 * Mutates the characters array directly.
 * @param {array} characters - A set of characters.
 * @return {array} Characters with their original scaling factors and points.
 */
export const revertBoardState = (characters) => {
    characters.forEach((character) => {
        revertCharacterState(character);
    });
    return characters;
}

/**
 * Reverts all the display variables and points for a single character.
 * Helper method for revertBoardState.
 * Mutates the characters array directly.
 * @param {object} character - A character object.
 * @return {object} Character with their original scaling factors and points.
 */
function revertCharacterState(character){
    let revertedCharacter = cleanCharacterPointState(character);
    revertedCharacter = cleanCharacterDisplayState(character);
    return revertedCharacter;
}

/**
 * Reverts all the points for a single character.
 * Helper method for revertCharacterState.
 * Mutates the character directly.
 * @param {object} character - A character object.
 * @return {object} Character with their original points.
 */
function cleanCharacterPointState(character){
    character.points = initializePoints(character.type);
    return character;
}

/**
 * Reverts all the display variables for a single character.
 * Helper method for revertCharacterState.
 * Mutates the character directly.
 * @param {object} character - A character object.
 * @return {object} Character with their original scaling factors.
 */
function cleanCharacterDisplayState(character){
    let cleanDisplayState = {
        groupSize: 1,
        groupId: 0,
        size: 0.07,
        x: character.x,
        y: character.y
    }
    character.displayData = cleanDisplayState;
    return character;
}

/**
 * Puts characters in groups based on their position.
 * Helper method for enforceGameRules.
 * @param {array} characters - A set of character objects.
 * @return {array} A list of groups of characters.
 */
export const getCharacterGroups = (characters) => {
    const groups = {};
    characters.forEach((character) => {
        let pos = String([character.x, character.y]);
        if(groups.hasOwnProperty(pos)){
            groups[pos].characters.push(character);
        }else{
            groups[pos] = {"characters": [character]};
        }
    });
    return groups;
}

/**
 * Given a list of characters check to see if their positions are allowed on
 * the given map.
 * Helper method for enforceGameRules.
 * @param {array} map - A binary matrix that represently playable positions.
 * @param {array} characters - A set of character objects.
 * @return {object} A boolean telling if the characters moves are valid and
 * a list of characters with invalid moves, if any.
 */
export const checkMoves = (map, characters) => {
    let validMoves = true;
    let charactersWithInvalidMoves = [];

    characters.forEach((character) => {
        if(!map[character.x][character.y]){
            validMoves = false;
            charactersWithInvalidMoves.push(character);
        }
    })
    return {validMoves, charactersWithInvalidMoves};
}

/**
 * Ends the game by taking all characters out of play.
 * Helper method for checkGameOver.
 * Uses a copy of characterStates.
 * @param {array} characters - A set of character objects.
 * @return {object} A boolean telling if the characters moves are valid and
 * a list of characters with invalid moves, if any.
 */
function endGame(characterStates){
    let characters = characterStates.slice();
    characters.forEach((character) => {
        character.inPlay = false;
    })
    return characters;
}

/**
 * Get a character from a list of characters by id.
 * Helper method for checkGameOver.
 * @param {string} id - The id of the desired character (e.g. "h1").
 * @param {array} characters - A set of character objects.
 * @return {object} A character with a matching id.
 */
export const getCharacter = (characters, id) => {
    let characterIndx = characters.findIndex(character => character.id === id);
    let character = characters.slice()[characterIndx];
    return character;
}

/**
 * Check if the game is over.
 * Helper method for enforceGameRules.
 * Uses a copy of originalCharacters.
 * @param {number} timesteps - The amount of timesteps currently in the game.
 * @param {array} originalCharacters - A set of character objects.
 * @return {object} A boolean representing whether the game is over and an
 * array of characters, possibly with updated "inPlay" values.
 */
function checkGameOver(timesteps, playMode, originalCharacters){
    let characters = originalCharacters.slice();
    let gameOver = false;

    // scenario 1: all stags are caught
    let stag1 = getCharacter(characters, "s1");
    let stag2 = getCharacter(characters, "s2");

    let scenario1_1 = (stag1 && stag1.hasOwnProperty("inPlay") ? !stag1.inPlay : false);
    let scenario1_2 = (stag2 && stag2.hasOwnProperty("inPlay") ? !stag2.inPlay : false);

    let scenario1 = scenario1_1 && scenario1_2;

    // scenario 2: player has caught a stag or a rabbit
    let player = getCharacter(characters, "h1");

    let scenario2 = (playMode && player && player.hasOwnProperty("points") ? false : player.points > 0);

    // scenario 3: no more hares to catch and player hasn't caught anything
    let hare1 = getCharacter(characters, "r1");
    let hare2 = getCharacter(characters, "r2");
    let scenario3 = ((hare1 && hare1.hasOwnProperty("inPlay") ? !hare1.inPlay : false) && (hare2 && hare2.hasOwnProperty("inPlay") ? !hare2.inPlay : false) && player.points === 0);

    // scenario 4: x amount of turns has passed
    const MAX_GAME_LENGTH = 10;
    let scenario4 = timesteps > MAX_GAME_LENGTH;

    if(scenario1 || scenario2 || scenario3 || scenario4){
        characters = endGame(characters);
        gameOver = true;
    }

    return {gameOver, characters};
}

/**
 * Enforces the game rules and checks to make sure each character has valid
 * moves and if the game is over, as well as starts handles character interactions.
 * Uses a copy of characters.
 * @param {number} timesteps - The amount of timesteps currently in the game.
 * @param {array} map - A binary matrix that represently playable positions.
 * @param {array} characters - A set of character objects.
 * @return {object} A boolean representing whether the game is over and an
 * array of updated characters.
 */
export const enforceGameRules = (timesteps, map, characters, playMode) => {
    const newChars = JSON.parse(JSON.stringify(characters));

    let gameStatus = {
        gameOver: true,
        validMoves: true
    };

    // check to see if all characters are at legal positions
    const {validMoves, charactersWithInvalidMoves} = checkMoves(map, newChars);
    if(!validMoves){
        console.log("invalid move made by ", charactersWithInvalidMoves);
        gameStatus.validMoves = false;
        gameStatus.gameOver = false;
        return {gameStatus, newChars};
    }

    // get the number of characters at each character position
    let groups = getCharacterGroups(newChars);

    // handle group interaction
    let updatedCharacters = [];
    for (const [key, value] of Object.entries(groups)) {
        if(value.characters.length > 1){
            let updatedGroup = handleInteraction(value.characters.slice());
            updatedCharacters = updatedCharacters.concat(updatedGroup);
        }else{
            let cleanCharacter = cleanCharacterDisplayState(value.characters.slice()[0]);
            updatedCharacters.push(cleanCharacter);
        }
    }

    // check if the game is over
    let gameState = checkGameOver(timesteps, playMode, updatedCharacters);
    gameStatus.gameOver = gameState.gameOver;
    updatedCharacters = gameState.characters;

    return {gameStatus, updatedCharacters};
}

/** UPDATING CHARACTER POSITIONS */

/**
 * Update a character's position based on a given move.
 * @param {object} originalCharacter - The amount of timesteps currently in the game.
 * @param {number} move - A number representing the direction of movement.
 * @return {object} A character with an updated position.
 */
export const getNextCharacterPosition = (originalCharacter, move) => {
    let character = JSON.parse(JSON.stringify(originalCharacter));

    /** Up, Right, Down, Left */
    const moveRef = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ];

    character.x = originalCharacter.x + moveRef[move][0];
    character.y = originalCharacter.y + moveRef[move][1];

    character.displayData.x = originalCharacter.displayData.x + moveRef[move][0];
    character.displayData.y = originalCharacter.displayData.y + moveRef[move][1];

    return character;
}

/**
 * Update a character within a set of characters.
 * @param {array} characters - A set of characters.
 * @param {object} character - A single character.
 * @return {array} An updated set of characters.
 */
function updateCharacter(characters, character){
    let updatedCharacters = characters.slice();
    let characterIndx = updatedCharacters.findIndex(c => c.id === character.id);
    updatedCharacters[characterIndx] = character;
    return updatedCharacters;
}

/**
 * Update a subset of characters within a set of characters.
 * @param {array} characterArr - A set of characters.
 * @param {array} characters - A subset of characters.
 * @return {array} An updated set of characters.
 */
export const updateCharacters = (characterArr, characters) => {
    let updatedCharacters = characterArr.slice();
    characters.slice().forEach((character) => {
        updatedCharacters = updateCharacter(updatedCharacters, character);
    });
    return updatedCharacters;
}

/**
 * Gives the full name of a character given type abbrevation.
 * @param {object} character - A single character.
 * @return {string} The character's full name.
 */
export const getCharacterNameDisplay = (character) => {
    let type;
    switch(character.type){
        case "r":
            type = "Rabbit";
            break;
        case "h":
            type = "Hunter";
            break;
        case "s":
            type = "Stag";
            break;
        default:
            type = character.type;
            console.log("Could not get display for this character.");
    }

    return (type + " " + character.id.charAt(1));
}

/**
 * Returns a character's points or 0, if thier points are less than zero.
 * @param {object} character - A single character.
 * @return {number} The character's formatted points.
 */
export const getPointDisplay = (character) => {
    return (character.points < 0 ? 0 : character.points);
}

/**
 * Returns a string corresponding to the character's "inPlay" status.
 * @param {object} character - A single character.
 * @return {string} The character's formatted points.
 */
export const getStatusDisplay = (character) => {
    const prey = ["s", "r"];

    if(prey.includes(character.id)){
        return (character.inPlay ? "playing" : "captured");
    }else{
        return (character.inPlay ? "playing" : "finished");
    }
}

// DEBUGGING METHODS


/**
 * Checks if two character states are the same.
 * @param {array} state1 - A list of characters.
 * @param {array} state2 - A list of characters.
 * @return {boolean} If the two states are the same.
 */
function directCompareStates(state1, state2){
    return (JSON.stringify(state1) === JSON.stringify(state2));
}

/**
 * Checks if two character states are the same and prints the character which
 * is different in the states.
 * @param {array} state1 - A list of characters.
 * @param {array} state2 - A list of characters.
 * @return {boolean} If the two states are the same.
 */
export const compareStates = (state1, state2) => {
    let equal = directCompareStates(state1, state2);
    if(!equal){
        state1.forEach((character) => {
            equal = state2.includes(character);
            if(!equal){
                console.log("Mismatched character:","\n 1:", getCharacter(state1, character.id),"\n 2:", getCharacter(state2, character.id));
            }
        })
    }
    return equal;

}

/**
 * Checks if a character has a consistent position.
 * @param {object} character - A single character.
 * @return {object} A pair of booleans showing whether the x and y's in the
 * position and displayData are the same.
 */
function checkCharacterPosition(character){
    let checkX = (Math.abs(character.displayData.x - character.x) < 0.5);
    let checkY = character.y === character.displayData.y;
    return {checkX, checkY};
}

/**
 * Check to see if the character's position matches the position in their
 * display data.
 * @param {array} characters - A set of characters.
 * @return {number} The number of characters with inconsistent positions.
 */
export const checkPositions = (characters) => {
    let numFail = 0;
    characters.forEach((character) => {
        let samePos = checkCharacterPosition(character);
        if(!(samePos.checkX && samePos.checkY)){
            console.log(character.id + " is inconsistent for x and y.", character);
            numFail += 1;
        }else if(!samePos.checkX){
            console.log(character.id + " is inconsistent for x.", character);
            numFail += 1;
        }else if(!samePos.checkY){
            console.log(character.id + " is inconsistent for y.", character);
            numFail += 1;
        }
    })
    console.log(numFail + " characters failed position consistency check.");
    return numFail;
}
