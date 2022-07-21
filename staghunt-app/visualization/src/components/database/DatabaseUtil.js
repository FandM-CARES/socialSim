/* DatabaseUtil.js */

export const validateTask = (task) => {
    let valid = {"status": true, "reason": null};
    return valid;
}

export const updateIDs = (id, task) => {
    task.forEach((game) => {
        game.id = id + game.id.substring(4);
    })
}
