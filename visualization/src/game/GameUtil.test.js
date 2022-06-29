import {scaleDisplay, updatePoints, getCharacterGroups, enforceGameRules, checkPositions} from "./GameUtil.js";
import MockGame from './MockGame.js';
import util from 'util';

// TESTING DATA

// data without an interaction
const dataWithNoInteraction = [
    {
        "id": "r1",
        "type": "r",
        "x": 1,
        "y": 4,
        "points": 1,
        "size": 0.07
    },
    {
        "id": "r2",
        "type": "r",
        "x": 5,
        "y": 1,
        "points": 1,
        "size": 0.07
    },
    {
        "id": "s1",
        "type": "s",
        "x": 2,
        "y": 5,
        "points": 10,
        "size": 0.07
    },
    {
        "id": "h1",
        "type": "h",
        "x": 2,
        "y": 1,
        "points": 0,
        "size": 0.07
    },
    {
        "id": "h2",
        "type": "h",
        "x": 1,
        "y": 3,
        "points": 0,
        "size": 0.07
    },
    {
        "id": "h3",
        "type": "h",
        "x": 1,
        "y": 5,
        "points": 0,
        "size": 0.07
    }
];

const dataWith1Interaction = [
    {
        "id": "r1",
        "type": "r",
        "x": 1,
        "y": 4,
        "points": 1,
        "size": 0.07
    },
    {
        "id": "r2",
        "type": "r",
        "x": 5,
        "y": 1,
        "points": 1,
        "size": 0.07
    },
    {
        "id": "s1",
        "type": "s",
        "x": 3,
        "y": 5,
        "points": 10,
        "size": 0.07
    },
    {
        "id": "h1",
        "type": "h",
        "x": 3,
        "y": 1,
        "points": 0,
        "size": 0.07
    },
    {
        "id": "h2",
        "type": "h",
        "x": 1,
        "y": 4,
        "points": 0,
        "size": 0.07
    },
    {
        "id": "h3",
        "type": "h",
        "x": 1,
        "y": 4,
        "points": 0,
        "size": 0.07
    }
];

const testGroupSingles = {
    '1,4': {
      characters: [ { id: 'r1', type: 'r', x: 1, y: 4, points: 1, size: 0.07 } ]
    },
    '5,1': {
      characters: [ { id: 'r2', type: 'r', x: 5, y: 1, points: 1, size: 0.07 } ]
    },
    '2,5': {
      characters: [ { id: 's1', type: 's', x: 2, y: 5, points: 10, size: 0.07 } ]
    },
    '2,1': {
      characters: [ { id: 'h1', type: 'h', x: 2, y: 1, points: 0, size: 0.07 } ]
    },
    '1,3': {
      characters: [ { id: 'h2', type: 'h', x: 1, y: 3, points: 0, size: 0.07 } ]
    },
    '1,5': {
      characters: [ { id: 'h3', type: 'h', x: 1, y: 5, points: 0, size: 0.07 } ]
    }
};

const testGroup1Interaction = {
  '1,4': {
    characters: [
      { id: 'r1', type: 'r', x: 1, y: 4, points: 1, size: 0.07 },
      { id: 'h2', type: 'h', x: 1, y: 4, points: 0, size: 0.07 },
      { id: 'h3', type: 'h', x: 1, y: 4, points: 0, size: 0.07 }
    ]
  },
  '5,1': {
    characters: [ { id: 'r2', type: 'r', x: 5, y: 1, points: 1, size: 0.07 } ]
  },
  '3,5': {
    characters: [ { id: 's1', type: 's', x: 3, y: 5, points: 10, size: 0.07 } ]
  },
  '3,1': {
    characters: [ { id: 'h1', type: 'h', x: 3, y: 1, points: 0, size: 0.07 } ]
  }
};

// TEST CASES

function print(object) {
    console.log(util.inspect(object, false, null, true /* enable colors */))
}

// tests for getCharacterGroups

test('testGettingCharacterGroupsSingles', () => {
    // testing the get character groups method when no interactions are happening
    let characters = dataWithNoInteraction.slice();
    let groups = getCharacterGroups(characters);
    expect(groups).toStrictEqual(testGroupSingles);
});

test('testGettingCharacterGroupsWithInteraction', () => {
    // testing the get character groups method when 1 interaction is happening
    let characters = dataWith1Interaction.slice();
    let groups = getCharacterGroups(characters);
    expect(groups).toStrictEqual(testGroup1Interaction);
});

// tests for updatePoints

test('testUpdatePointsSingles', () => {
    // testing the update points method when no interactions are happening
    let group = testGroupSingles['1,4'].characters.slice();
    let updatedGroup = updatePoints(group);
    expect(group).toStrictEqual(updatedGroup); // should not change
});

test('testUpdatePointsGroups', () => {
    // testing the update points method when 1 interaction is happening
    let group = testGroup1Interaction['1,4'].characters.slice();
    let updatedGroup = updatePoints(group);
    let expectedGroup = [
      { id: 'r1', type: 'r', x: 1, y: 4, points: -1, size: 0.07 },
      { id: 'h2', type: 'h', x: 1, y: 4, points: 1, size: 0.07 },
      { id: 'h3', type: 'h', x: 1, y: 4, points: 0, size: 0.07 }
  ];
    expect(updatedGroup).toStrictEqual(expectedGroup);
});

// tests for scaleDisplay

test('testScaleDisplaySingles', () => {
    // testing the scale display method when no interactions are happening
    let group = testGroupSingles['1,4'].characters.slice();
    let updatedGroup = scaleDisplay(group);
    expect(group).toStrictEqual(updatedGroup); // should not change
});

test('testscaleDisplayGroups', () => {
    // testing the scale display method when 1 interaction is happening
    let group = testGroup1Interaction['1,4'].characters.slice();

    let updatedGroup = scaleDisplay(group);
    let expectedGroup = [];
    expect(updatedGroup).toStrictEqual(expectedGroup);
});

test('testGetNPCMoves', () => {
    // testing the scale display method when no interactions are happening
    let npcMoves = MockGame.getNPCMoves(dataWithNoInteraction);

    let numFail = checkPositions(npcMoves);
    let totalFailures = numFail;
    for(let i=0; i < 20 || numFail > 1; i++){
        npcMoves = MockGame.getNPCMoves(exCharState);
        numFail = checkPositions(npcMoves);
        totalFailures += numFail;
    }

    expect(totalFailures).toBe(0);
});
