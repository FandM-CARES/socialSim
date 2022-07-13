/* GameUtil.js */

// GAME SETUP METHODS

function initializePoints(charType) {
    // takes the type of character and assigns them points
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

// GAME LOGIC METHODS

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
        characterDict['r'][i].inPlay = false;
    }

    const updatedSubGroups = Object.keys(characterDict).map(function(key){
        return characterDict[key];
    });

    const updatedGroup = [].concat.apply([], updatedSubGroups);

    return updatedGroup;
}

export const scaleDisplay = (group) => {
    // scale the way characters are displayed so there is no overlap
    // given group reassing x, y, and s to scale characters

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

function intakeGroup(group) {
    let groupSize = group.length;
    for(let i=0; i < groupSize; i++){
        group[i].displayData.groupSize = groupSize;
        group[i].displayData.groupId = i;
    }
    return group;
}

function handleInteraction(group){
    // function to handle the interaction of a group of characters
    let updatedGroup = intakeGroup(group);
    updatedGroup = updatePoints(updatedGroup);
    updatedGroup = scaleDisplay(updatedGroup);
    return updatedGroup;
}

export const revertBoardState = (characters) => {
    // reverts all the display variables and points
    characters.forEach((character) => {
        revertCharacterState(character);
    });
    return characters;
}

function revertCharacterState(character){
    let revertedCharacter = cleanCharacterPointState(character);
    revertedCharacter = cleanCharacterDisplayState(character);
    return revertedCharacter;
}

function cleanCharacterPointState(character){
    character.points = initializePoints(character.type);
    return character;
}

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

export const getCharacterGroups = (characters) => {
    // Get the groups of characters at the same position
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

export const checkMoves = (map, characters) => {
    // given a list of characters check to see if their positions are allowed on
    // the given map
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

function endGame(characters){
    characters.forEach((character) => {
        character.inPlay = false;
    })
    return characters;
}

export const getCharacter = (characters, id) => {
    // get a character from a list of characters by id
    let characterIndx = characters.findIndex(character => character.id === id);
    let character = characters.slice()[characterIndx];
    return character;
}

function checkGameOver(timesteps, originalCharacters){
    let characters = originalCharacters.slice();
    let gameOver = false;

    // stag is caught
    let stag = getCharacter(characters, "s1");
    let scenario1 = !stag.inPlay;

    // player has caught a stag or a rabbit
    let player = getCharacter(characters, "h1");
    let scenario2 = player.points > 0;

    // no more hares to catch and player hasn't caught anything
    let hare1 = getCharacter(characters, "r1");
    let hare2 = getCharacter(characters, "r2");
    let scenario3 = (!hare1.inPlay && !hare2.inPlay && player.points === 0);

    // x amount of turns has passed
    let scenario4 = timesteps > 5;

    if(scenario1 || scenario2 || scenario3 || scenario4){
        characters = endGame(characters);
        gameOver = true;
    }

    return {gameOver, characters};
}

export const enforceGameRules = (timesteps, map, characters) => {
    const newChars = characters.slice();

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
    let gameState = checkGameOver(timesteps, updatedCharacters);
    gameStatus.gameOver = gameState.gameOver;
    updatedCharacters = gameState.characters;

    return {gameStatus, updatedCharacters};
}

// UPDATING CHARACTER POSITIONS

export const getNextCharacterPosition = (originalCharacter, move) => {
    let character = JSON.parse(JSON.stringify(originalCharacter));

    const moveRef = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ];
    // Up, Right, Down, Left

    character.x = originalCharacter.x + moveRef[move][0];
    character.y = originalCharacter.y + moveRef[move][1];

    character.displayData.x = originalCharacter.displayData.x + moveRef[move][0];
    character.displayData.y = originalCharacter.displayData.y + moveRef[move][1];

    return character; // updated move
}

function updateCharacter(characters, character){
    // update a character in a list of character objects
    let updatedCharacters = characters.slice();
    let characterIndx = updatedCharacters.findIndex(c => c.id === character.id);
    updatedCharacters[characterIndx] = character;
    return updatedCharacters;
}

export const updateCharacters = (characterArr, characters) => {
    // update a character in a list of character objects
    let updatedCharacters = characterArr.slice();
    characters.slice().forEach((character) => {
        updatedCharacters = updateCharacter(updatedCharacters, character);
    });
    return updatedCharacters;
}

// DEBUGGING METHODS

function directCompareStates(state1, state2){
    return (JSON.stringify(state1) === JSON.stringify(state2));
}

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

function checkCharacterPosition(character){
    let checkX = (Math.abs(character.displayData.x - character.x) < 0.5);
    let checkY = character.y === character.displayData.y;
    return {checkX, checkY};
}

export const checkPositions = (characters) => {
    // check to see if the character's position matches the position in their display data
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
