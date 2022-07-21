/** PointsTable */

/* React Modules & Components */
import React from 'react';
import Table from 'react-bootstrap/Table';

/* Custom Modules */
import { getCharacterNameDisplay, getPointDisplay, getStatusDisplay } from '../game/GameUtil.js';

/* Styling */
import './PointsTable.css';

/**
 * React functional component to render a table with data on each character's
 * current points.
 * @param {array} characters - A set of character objects.
 * @return {JSX} A table with each character's points and playing status.
 */
function PointsTable({ characters }) {

    return (
        <div className="characterPointsDisplay">
            <Table striped hover bordered size="sm">
                <thead>
                    <tr>
                        <th>Character</th>
                        <th>Points</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(
                        (character) => (
                            <tr key={character.id}>
                                <td>{getCharacterNameDisplay(character)}</td>
                                <td>{getPointDisplay(character)}</td>
                                <td>{getStatusDisplay(character)}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default PointsTable;
