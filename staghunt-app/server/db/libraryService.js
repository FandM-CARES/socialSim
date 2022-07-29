const { MongoClient, ServerApiVersion } = require('mongodb');

async function getLibraryFromDatabase(client, limitNumber, collectionName){
    let verifiedName = (collectionName && ["simulations", "tasks"].include(collectionName) ? collectionName : "simulations");
    const collection = client.db("staghunt").collection(verifiedName);
    const cursor = await collection.find().limit(limitNumber);
    const result = await cursor.toArray();
    return result;
}

async function getLibrary(sizeLimit, collectionName) {
    let size = (sizeLimit && sizeLimit.hasOwnProperty("size") ? parseInt(sizeLimit.size) : 10);
    const uri = "mongodb+srv://staghunt_user:CINB5R1XA9BsFMVx@staghuntcluster.xyqww.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    let result = { "wasSuccessful":false };

    try{
        await client.connect();
        const res = await getLibraryFromDatabase(client, size, collectionName);
        result.library = res;
    }catch(err){
        console.error(err);
    }finally{
        await client.close();
    }

    return result;
}

module.exports.getLibrary = getLibrary;
