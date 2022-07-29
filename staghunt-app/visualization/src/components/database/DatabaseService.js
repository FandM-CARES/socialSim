/**
 * Class to initiate all database related operations.
 * @class DatabaseService
 */

const SERVER_API = 'http://localhost:9000';

class DatabaseService {

    /**
     * Uploads completed task to database.
     * @param {object} task - The task object to be uploaded.
     * @return {object} A status boolean from the upload and a payment code.
     */
    async uploadTask(task){
        console.log("task being uploaded: ", task);
        let res = fetch(SERVER_API + '/uploadTask',{
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

    /**
     * Gets a collection of games from MongoDB.
     * @return {array} A list of games.
     */
    async getLibrary(){
        let res = fetch(SERVER_API + '/library',{
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Unable to get library.', error));

        return res;
    }

    /**
     * Grows the library by adding more games from MongoDB.
     * @return {array} A list of games.
     */
    async addShelf(sizeLimit, collection){
        let size = (sizeLimit && typeof sizeLimit === "number" ? sizeLimit.toString() : "10");
        console.log("size: ", size, typeof size, JSON.stringify(size), typeof JSON.stringify(size));
        let data = { "size": size, "collection": collection};
        let res = fetch(SERVER_API + '/library', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .catch(error => console.error('Unable to add shelf.', error));

        return res;
    }
}

export default new DatabaseService();
