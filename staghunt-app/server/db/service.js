const { MongoClient, ServerApiVersion } = require('mongodb');
const { validateTask, updateIDs } = require('./DatabaseUtil.js');

async function getNextTaskId(client){
    const collection = client.db("staghunt").collection("meta_data");
    const result = await collection.findOne({ "name":"nextTaskIdContainer"});
    const id = result.nextTaskID;
    /** Update task id */
    let updatedID = "t-" + (parseInt(id.slice(-2)) + 1).toString();
    let updatedContainer = {"name":"nextTaskIdContainer", "nextTaskID":updatedID};
    const next = await collection.updateOne({ name: "nextTaskIdContainer" }, { $set: updatedContainer });
    return id;
}

async function createNewTask(client, data){
    const collection = client.db("staghunt").collection("tasks");
    const result = await collection.insertOne(data);
    console.log(`New task created with the following id: ${result.insertedId}`);
    return result.acknowledged;
}

async function test_cleanup(client) {
    const collection = client.db("staghunt").collection("meta_data");
    const result = await collection.deleteOne({"name":"test"});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function getPaymentCode(client){
    return "Empty Test Result";
}

async function uploadTask(data) {
    const uri = "mongodb+srv://staghunt_user:CINB5R1XA9BsFMVx@staghuntcluster.xyqww.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    let result = {"wasSuccessful":false, "payment": "X-X"};

    try{
        await client.connect(async function(err) {
            // get the next taskId
            const id = await getNextTaskId(client);
            console.log("Result: ", id);
            // create a new task object and update the IDs to match
            updateIDs(id, data);
            const successfulUpload = await createNewTask(client, data);
            /** @TODO: Get a usable payment code. */
            const payment = await getPaymentCode(client);

            result.taskID = id;
            result.wasSuccessful = successfulUpload;
            result.payment = payment;
        });
    }catch(err){
        console.error(err);
    }finally{
        await client.close();
    }

    return result;
}

module.exports.uploadTask = uploadTask;
