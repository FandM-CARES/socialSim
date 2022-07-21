/**
 * Set of helper functions for the task related operations.
 * @utility TaskUtil
 */

/**
* Take in current games list and add an additional game by update the
* corresponding game.
* @param {array} gamesState - List of games.
* @param {object} data - A single game object.
* @return {array} An updated list of games.
*/
export const updateGameData = (gamesState, data) => {
    // take in current game list and add an additional game
    let games = gamesState.slice();
    games.forEach((game) => {
        if(!game.complete && game.id === data.id){
            game.data = data;
            game.complete = true;
        }
    });
    return games;
}

/**
* Get's the progress of the games as a percentage.
* @param {number} ctr - The index of the current game in the games list.
* @param {number} upperBound - The length of the games list.
* @return {number} The percentage of completion.
*/
export const getProgress = (ctr, upperBound) => {
    return Math.ceil(100 * ctr / upperBound);
}
