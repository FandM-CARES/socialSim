/* TaskUtil.js */

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

export const getProgress = (ctr, upperBound) => {
    return Math.ceil(100 * ctr / upperBound);
}
