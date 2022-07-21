/** Header */

/* React Modules & Components */
import React from 'react';

/* Styling */
import './Header.css';

/**
 * React functional component to generate a header.
 * @return {JSX} A header for the page.
 */
function Header() {
    return (
        <div className="header">
            <div className="header-left">
                <a href="#default" className="logo">Staghunt</a>
            </div>
            <div className="header-right">
                <p className="oxyHeader">
                Occidental College Undergraduate Research
                </p>
            </div>
        </div>
    )
}

export default Header
