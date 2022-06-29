/* TaskUtil.js */

export const getTaskId = () => {
    const taskId = "person-00"; // data_label (person vs. simulation)-participant_number
    // TODO: Query list of ids and get next available one
    // Alt: Make the id based on the time the task was started
    return taskId;
}

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
