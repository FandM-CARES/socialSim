/* HuntspaceUtil.js*/

export const getSetupData = (svgWidth, svgHeight, mapWidth) => {

  const cellWidth = svgWidth / mapWidth;
  const cellHeight = svgHeight / mapWidth;

  // [xOffset, yOffset, textAnchor (horizontal alignment, dominantBaseline (vertical alignment)]
  const labelOffset = {
    h1: [.05, .05, "start", "hanging"],
    h2: [.5, .05, "middle", "hanging"],
    h3: [.95, .05, "end", "hanging"],
    r1: [.05, .5, "start", "middle"],
    r2: [.95, .5, "end", "middle"],
    s1: [.05, .5, "start", "baseline"],
    s2: [.95, .5, "end", "baseline"]
  };

  const labelOffsetGroups = [
      [.05, .05, "start", "hanging"],
      [.5, .05, "middle", "hanging"],
      [.95, .05, "end", "hanging"],
      [.05, .5, "start", "middle"],
      [.5, .5, "middle", "middle"],
      [.95, .5, "end", "middle"],
  ];

  // rabbit
  // Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  // deer
  // Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  // Icons made by <a href="https://www.flaticon.com/free-icon/rabbit_2911423?term=rabbit&page=1&position=34" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  // Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  // Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  const dLookup = {
    r: "M453.2,185.885a40.26,40.26,0,0,0-22.628-11.314l-25.192-3.6a24.076,24.076,0,0,1-19.594-16.863l-12.968-43.228a71.989,71.989,0,0,0-20.8-32.828l-66.667-60a8,8,0,0,0-12.507,2.368c-30.6,61.2-15.041,108.745,3.4,137.858a168.956,168.956,0,0,0,41.265,44.189c-7.977,14.3-15.853,27.029-21.68,30.79-3.351,2.163-6.161,1.463-16.736-2.48-18.047-6.73-48.252-17.992-112.481-6.657C101.227,235.66,73,276.532,60.832,308.788c-10.71,28.395-12.7,58.771-9.746,85.43l-24.115-9.646a8,8,0,0,0-10.944,8.092,182.3,182.3,0,0,0,5.923,31.205c6.535,23.051,16.378,38.682,29.255,46.459a37.673,37.673,0,0,0,19.8,5.55A48.055,48.055,0,0,0,86.4,473.162a45.036,45.036,0,0,0,23.959,8.546c13.12.721,25.056-4.376,33.645-9.619A24.029,24.029,0,0,0,168,496H272a8,8,0,0,0,8-8V469.117a24.064,24.064,0,0,0-19.293-23.534L240,441.441V431.16l57.748-6.416,11.658,52.462A23.859,23.859,0,0,0,332.835,496H384a8,8,0,0,0,8-8V472.562a23.951,23.951,0,0,0-10.688-19.968L368,443.719v-23.8c26.03-20.78,42.564-49.982,47.907-84.707a161.6,161.6,0,0,0,.916-42.13l64.09-25.636A23.886,23.886,0,0,0,496,245.167v-6.54a23.845,23.845,0,0,0-7.029-16.971ZM59.489,456.64c-14.636-8.828-22.331-34.313-25.647-52.087L54,412.617c4.214,20.235,11.182,37.022,18.809,47.167A22.251,22.251,0,0,1,59.489,456.64ZM480,245.167a7.963,7.963,0,0,1-5.028,7.429l-69.943,27.976a8.015,8.015,0,0,0-4.876,8.985,139.805,139.805,0,0,1-.144,43.77C394.938,365.441,379.863,391.1,355.2,409.6A8,8,0,0,0,352,416v32a8,8,0,0,0,3.562,6.656l16.876,11.25A7.987,7.987,0,0,1,376,472.562V480H332.835a7.953,7.953,0,0,1-7.81-6.265l-13.215-59.47a8,8,0,0,0-7.8-6.266,8.132,8.132,0,0,0-.891.05l-65.144,7.238c-3.805-12.5-14.084-38.187-37.035-51.506-16.844-9.774-36.85-10.909-59.467-3.371a8,8,0,0,0,5.06,15.18c18.038-6.015,33.617-5.344,46.3,1.988,22.238,12.852,30.023,42.456,31.166,47.309V448a8,8,0,0,0,6.431,7.845l27.138,5.427A8.021,8.021,0,0,1,264,469.117V480H168a8.009,8.009,0,0,1-8-8V456a8,8,0,0,0-13.657-5.657c-.163.165-16.948,16.413-35.1,15.389-9.3-.514-17.475-5.333-24.993-14.729-8.9-11.121-16.178-32.775-19-56.513-3.348-28.118-.307-56.549,8.559-80.054,7.156-18.972,17.968-34.782,32.136-46.992,16.193-13.953,36.869-23.227,61.452-27.566,59.944-10.577,87.588-.267,104.109,5.893,11.034,4.114,20.564,7.666,31,.932,8.235-5.314,15.937-16.133,30.522-42.872a8.012,8.012,0,0,0-2.821-10.639,151.466,151.466,0,0,1-42.748-43.955C267.865,114.823,265.606,77.176,282.7,37.19l58.619,52.756a55.99,55.99,0,0,1,16.176,25.533l12.969,43.229a40.125,40.125,0,0,0,32.657,28.1l25.192,3.6a24.157,24.157,0,0,1,13.576,6.788l35.771,35.772A7.94,7.94,0,0,1,480,238.627Z",
    s: "M485.949,188.7,440,155.883V140.6c9.731-6.155,32-23.426,32-52.6a8,8,0,0,0-16,0c0,20.148-15.747,33.166-23.45,38.33l-28.423-21.864c13.631-8.038,30.631-24.692,27.844-57.151a8,8,0,0,0-15.942,1.37c2.408,28.038-13.719,40-25.9,45.009L364.717,74.15c-2.275-11-5.259-32.52,2.3-46.3a8,8,0,0,0-14.03-7.692c-6.565,11.975-7.482,26.964-6.443,40.016L332.878,49.659a6.434,6.434,0,0,0-1.482-.9,20.9,20.9,0,0,1-6.189-5.4c-3.9-4.957-5.655-11.315-5.22-18.9a8,8,0,0,0-15.974-.916c-1.486,25.913,15.309,36.838,19.658,39.221L424,139.939V152H408a8.008,8.008,0,0,0-2.875.534l-1.234.476-28.557-15.99a8,8,0,0,0-11.4,4.169,73.026,73.026,0,0,0-3.73,28.621l-56.715,21.814-29.551-7.386a8,8,0,0,0-5.518.607l-13.635,6.817-123.024-21.71a40.123,40.123,0,0,0-25.51,3.949c-1.382.728-2.669,1.422-3.9,2.1H61.67a39.818,39.818,0,0,0-37.148,25.149l-7.95,19.88A8,8,0,0,0,24,232H43.936c-10.3,21.916-10.581,46.417-.662,71.663A136.238,136.238,0,0,0,62.667,337.3l-29.978,67.45a8.008,8.008,0,0,0-.352,5.548l24,80A8,8,0,0,0,64,496h40a8,8,0,0,0,8-8V472a8,8,0,0,0-2.343-5.657L95.542,452.229,88.352,401.9l30.037-45.05A19.745,19.745,0,0,1,146.673,352a40.282,40.282,0,0,0,24,8h85.922l7.431,96.613a8.017,8.017,0,0,0,.216,1.327l8,32A8,8,0,0,0,280,496h40a8,8,0,0,0,8-8V472a8,8,0,0,0-2.343-5.657L312.24,452.926l7.379-103.3c10.194-4.775,30.578-18.977,32.269-56.558C380.814,278.715,403.147,261.3,419.94,240H472a24.028,24.028,0,0,0,24-24v-7.77A24.079,24.079,0,0,0,485.949,188.7ZM376.693,156.118,392,164.689v30.757a32.9,32.9,0,0,1-12.489-13.717C375.322,172.915,375.612,163.094,376.693,156.118ZM35.815,216l3.563-8.909A23.894,23.894,0,0,1,61.67,192H77.687A125.6,125.6,0,0,0,53.6,216ZM96,475.313V480H69.952l-4.8-16H84.686ZM312,480H286.246l-4-16h18.44L312,475.313ZM480,216a8.009,8.009,0,0,1-8,8H416a8,8,0,0,0-6.4,3.2c-16.281,21.735-38.859,39.258-69.026,53.568A8,8,0,0,0,336,288c0,40.667-24.961,47.97-25.94,48.239a8,8,0,0,0-6.039,7.191L296.551,448H279.408l-7.431-96.613a8,8,0,0,0-4.388-6.535h0a78.124,78.124,0,0,1-14.569-10.088C247.081,329.513,240,321.3,240,312a8,8,0,0,0-16,0c0,13.159,7.391,24.023,15.516,32H170.67a24.173,24.173,0,0,1-14.4-4.8,35.744,35.744,0,0,0-51.2,8.774l-31.73,47.589a8,8,0,0,0-1.263,5.57L78.776,448H60.352L48.514,408.54l30.8-69.291a8.019,8.019,0,0,0-1.405-8.645,118.386,118.386,0,0,1-19.912-33.233C48.224,272.165,50.35,249,64.313,228.5c9.292-13.648,23.968-26.2,43.635-37.3,1.763-1,3.647-2.027,5.75-3.134a24.063,24.063,0,0,1,15.282-2.356l125.63,22.17a7.98,7.98,0,0,0,4.968-.723l13.353-6.676,29.116,7.279a8,8,0,0,0,4.825-.291l56.892-21.883c.38.961.781,1.921,1.231,2.875,5.962,12.649,16.865,21.77,32.406,27.107A8,8,0,0,0,408,208V168.573l1.487-.573h19.95l47.2,33.713A8.042,8.042,0,0,1,480,208.23Z",
    h: "M68.169,447.023C71.835,449.023,159.075,496,256,496c105.008,0,184.772-47.134,188.116-49.14A8,8,0,0,0,448,440c0-64.593-19.807-123.7-55.771-166.442-25.158-29.9-56.724-50.28-91.539-59.662a104,104,0,1,0-89.38,0c-34.815,9.382-66.381,29.765-91.539,59.662C83.807,316.3,64,375.407,64,440A8,8,0,0,0,68.169,447.023ZM168,120a88,88,0,1,1,88,88A88.1,88.1,0,0,1,168,120ZM132.013,283.859C164.5,245.258,208.528,224,256,224s91.5,21.258,123.987,59.859c32.681,38.838,51.056,92.48,51.977,151.474C414.845,444.6,343.708,480,256,480c-81.11,0-157.5-35.609-175.96-44.856C81,376.223,99.367,322.656,132.013,283.859Z"
  };

  return {cellWidth, cellHeight, labelOffset, labelOffsetGroups, dLookup};
}

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
            console.log("Could not set an initial point value for character type: ", charType);
            return 0;
    }
}

export const createCharacterStates = (states) => {
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

export const getWallCoordinates = (mapData) => {
    const wallsCoord = mapData.map(function (row, i) {
        return row.map(function(col, j) {
            var fill = col ? "none" : "#000";
            return {
                x: i,
                y: j,
                wall: fill
            };
        });
    }).flat();
  return wallsCoord;
};

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
    }

    // only two hunters can claim a stag
    for (let i = 0; numHunters > 1 && i < numStags; i++) {
        characterDict['h'][i%numHunters].points += 5;
        characterDict['h'][(i+1)%numHunters].points += 5;
        characterDict['s'][i].points -= 11;
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
    updatedGroup = updatePoints(group);
    updatedGroup = scaleDisplay(group);
    return updatedGroup
}

export const revertBoardState = (characters) => {
    // reverts all the display variables and points
    characters.forEach((character) => {
        revertCharacterState(character);
    })

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

export const enforceGameRules = (characters) => {
    const newChars = characters.slice();

    // get the number of characters at each character position
    const groups = getCharacterGroups(newChars);

    // handle group interaction
    const updatedCharacters = [];
    for (const [key, value] of Object.entries(groups)) {
        if(value.characters.length > 1){
            let updatedGroup = handleInteraction(value.characters.slice());
            updatedGroup.forEach((character) => {
                updatedCharacters.push(character);
            })
        }else{
            let cleanCharacter = cleanCharacterDisplayState(value.characters.slice()[0]);
            updatedCharacters.push(cleanCharacter);
        }
    }

    return updatedCharacters;
}

export const getNextCharacterPositions = (player, move) => {
    const moveRef = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ]
    // Up, Right, Down, Left

    let x = player.x + moveRef[move][0];
    let y = player.y + moveRef[move][1];

    player.x = x;
    player.y = y;

    return player; // updated move
}
