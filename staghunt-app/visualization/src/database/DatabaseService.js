/**
 * Class to initiate all database related operations
 * @class DatabaseService
 */

const SERVER_API = 'http://localhost:9000/uploadTask';

class DatabaseService {

    /**
     * Uploads completed task to database.
     * @param {object} task - The task object to be uploaded.
     * @return {object} A status boolean from the upload and a payment code.
     */
    async uploadTask(task){
        console.log("task being uploaded: ", task);
        let res = fetch(SERVER_API,{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
        .then(res => res.json())
        .catch(error => console.error('Unable to upload task.', error));

        return res;
    }
}

export default new DatabaseService();
