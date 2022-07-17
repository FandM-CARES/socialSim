/* DatabaseUtil.js */

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
