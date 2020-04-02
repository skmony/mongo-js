
const { MongoClient } = require("mongodb")


const uri = "mongodb://localhost:27017"
connect();
async function connect() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db("thunderbolt");
        console.log(`Connected to database ${db.databaseName}`)

        /*
        Get Collections
        const collections = await db.collections();
        collections.forEach(c => console.log(c.collectionName));
        **/
        ///////////////// Read Operation /////////////////////////

        const employees = db.collection("employess");
        const searchCursor = await employees.find();
        const result = await searchCursor.toArray();
        console.table(result);


        //////////////////////////////////////////////////////////

        ///////////////// Insert Operation ///////////////////////

        const insertCursor = await employees.insertMany([
            {
                "name": "Anna",
                "ssn": "25"
            },
            {
                "name": "Shashikant",
                "ssn": "12"
            },
            {
                "name": "Someone",
                "ssn": "21"
            },
            {
                "name": "Someone 2",
                "ssn": "17"
            }
        ])
        console.log(insertCursor.insertedCount)

        ///////////////////////////////////////////////////////////

        ///////////////// Update Operation //////////////////////

        const updateCursor = await employees.updateOne({ "name": "Someone 2" }, { "$set": { "DOB": "9-10-2017" } })
        console.log((updateCursor).modifiedCount)

        /////////////////////////////////////////////////////////

        ///////////////// Delete Operation //////////////////////

        const deleteCursor = await employees.deleteOne({ "name": "Someone" })
        console.log((deleteCursor).deletedCount)

        /////////////////////////////////////////////////////////

    }
    catch (ex) {
        console.error(`Something bad happend ${ex}`)
    }
    finally {
        client.close();
    }

}