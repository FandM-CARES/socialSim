/* databse-service.js */

import MockGame from '../companions/MockGame';

const SERVER_API = '/tweets';

class GameService {

    /**
     * Gets the next moves for each NPC.
     * @param {array} characters - Holds information about each characters
     * current location and status (e.g. points)
     */
    getNPCMoves(characters){
        /** @TODO: Replace with call to backend */
        return MockGame.getNPCMoves(characters);
    }
}

export default new GameService();
