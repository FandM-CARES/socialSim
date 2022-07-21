import React from 'react';
import Table from 'react-bootstrap/Table';
import './PointsTable.css';
import { getCharacterNameDisplay, getPointDisplay, getStatusDisplay } from '../game/GameUtil.js';

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

export default PointsTable
