async function sendNotification(message) {
    const url = 'https://hooks.slack.com/services/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';

    try{
        let res = fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        })
        .catch(error => console.error('Unable to send notification.', error));

    }catch(err){
        console.error(err);
        return false;
    }

    return true;
}

module.exports.sendNotification = sendNotification;
