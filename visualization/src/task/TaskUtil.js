/* TaskUtil.js */

export const getTaskId = () => {
    const taskId = "person-00"; // data_label (person vs. simulation)-participant_number
    // TODO: Query list of ids and get next available one
    // Alt: Make the id based on the time the task was started
    return taskId;
}
