/** Payment */

/* React Modules & Components */
import React from 'react';

/**
 * React functional component to display a payment code.
 * @param {string} paymentCode - A payment code.
 * @return {JSX} A payment code to be displayed.
 */
function Payment({ paymentCode }) {

    let display = <p> {paymentCode} </p>;

    return (
        <div className="payment">
            {display}
        </div>
    );
}

export default Payment;
