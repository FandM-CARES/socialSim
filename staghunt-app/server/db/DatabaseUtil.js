/* DatabaseUtil.js */

const validateTask = (task) => {
    /** @TODO: Add task validation */
    let valid = {"status": true, "reason": null};
    return valid;
}

const updateIDs = (id, task) => {
    if(task.hasOwnProperty("id")){
        task.id = id;
        task.games.forEach((game) => {
            game.id = id + game.id.substring(4);
        })
    }
}

module.exports = {
    validateTask: validateTask,
    updateIDs: updateIDs
}
