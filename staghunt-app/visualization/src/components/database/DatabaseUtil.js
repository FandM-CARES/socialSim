/* DatabaseUtil */

/**
 * Generates a random move for the given character.
 * @param {object} task - A task object.
 * @return {boolean} Whether the task is valid or not.
 */
export const validateTask = (task) => {
    let valid = {"status": true, "reason": null};
    return valid;
}

/**
 * Updates the ids of each game object in the given task's 'games' attribute.
 * Mutates the task object directly.
 * @param {number} id - A character you want to randomly move.
 * @param {object} task - A character you want to randomly move.
 */
export const updateIDs = (id, task) => {
    task.forEach((game) => {
        game.id = id + game.id.substring(4);
    })
}
