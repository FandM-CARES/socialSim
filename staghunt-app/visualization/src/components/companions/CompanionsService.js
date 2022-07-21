/**
 * Class to initiate all companions related operations.
 * @class CompanionsService
 */

const SERVER_API = 'http://localhost:8080/';

class CompanionsService {

    /**
     * Get's NPC moves from Companions.
     * @param {array} characters - Current position data for each character.
     * @return {boolean} A status boolean from the retrieval and the NPC Moves.
     */
    async getNPCMoves(characters){
        let res = fetch(SERVER_API,{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characters),
        })
        .then(res => res.json())
        .catch(error => console.error('Unable to retrieve NPC moves.', error));

        return res;
    }
}

export default new CompanionsService();
