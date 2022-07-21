/** Footer */

/* React Modules & Components */
import React from "react";

/* Styling */
import './Footer.css';

/**
 * React functional component to generate a footer.
 * @return {JSX} A footer for the page.
 */
function Footer() {
    return (
        <div className="footer">
            <div className="footer-right">
                <p className="oxyHeader">
                Occidental College Undergraduate Research
                </p>
            </div>
        </div>
    )
}

export default Footer;
