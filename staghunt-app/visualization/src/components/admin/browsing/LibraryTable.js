/** LibraryTable */

/* React Modules & Components */
import React from 'react';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

/* Custom Components */
import Huntspace from '../../huntspace/Huntspace.js';

/* Custom Modules */
import { getCharacters, createPreviewState } from '../AdminUtil.js';

/* Styling */

/**
 * React functional component to render a table with each simulation in MongoDB.
 * @param {array} library - A list of simulations.
 * @return {JSX} A table with each simulation.
 */
function LibraryTable({ library, visualize }) {
    /** Put a preview when someone hovers over the row. */
    const config = {
        "svgWidth": 100,
        "svgHeight": 100,
        "playMode": false,
        "header": { "show": false }
    };

    const popover = (game) => {
        let previewState = createPreviewState(game);
        return (
              <Popover id="popover-basic">
                <Popover.Header as="h3">Huntspace Preview</Popover.Header>
                <Popover.Body>
                    <Huntspace id={game.id} characters={previewState} map={game.map} stateCounter={1} config={config}/>
                </Popover.Body>
              </Popover>
            );
        };

    return (
        <div className="libraryDisplay">
                <Table striped hover bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Map Width</th>
                            <th>Characters</th>
                            <th>Length</th>
                        </tr>
                    </thead>
                    <tbody>
                        {library.map(
                            (game) => (
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 100, hide: 100 }}
                                    overlay={popover(game)}
                                    key={"tr-"+game.id}>
                                <tr key={game.id} onClick={() => visualize(game)}>
                                    <td>{game.id}</td>
                                    <td>{game.map.length}</td>
                                    <td>{getCharacters(game)}</td>
                                    <td>{game.states.length}</td>
                                </tr>
                                </OverlayTrigger>

                            )
                        )}
                    </tbody>
                </Table>
        </div>
    );
}

export default LibraryTable;
