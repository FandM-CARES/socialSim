import React from 'react';

function Payment({ paymentCode }) {

    let display = <p> {paymentCode} </p>;

    return (
        <div className="payment">
            {display}
        </div>
    );
}

export default Payment
