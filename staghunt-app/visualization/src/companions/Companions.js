/* Companions.js */

/* Communicates with the python server to get NPC moves */

class Companions {
    static companionsURL = 'http://localhost:8080/';

    static async getTest() {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
          throw Error(body.message)
        }
        return body;
    }

    static async getNPCMoves(characterState) {
        console.log("making fetch");
        const data = {"email": "hey@mail.com", "password": "101010"};

        try {
            await fetch(this.companionsURL, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }catch(err){
            console.log(err);
        }
        return null;
    }
}

export default Companions
