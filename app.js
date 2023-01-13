import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "myDB";

async function main() {
  await client.connect();
  console.log("Connected Successfully to Server!");

  const db = client.db(dbName);
  const collection = db.collection("students");

  // Query Insert Documents
  const insertResult = await collection.insertMany([
    {
      name: "Grealish",
      email: "gre@gmail.com",
      age: 18,
    },
    {
      name: "Jack",
      email: "jack@gmail.com",
      age: 19,
    },
    {
      name: "Nunez",
      email: "nunez@gmail.com",
      age: 19,
    },
    {
      name: "Paul",
      email: "paul@gmail.com",
      age: 20,
    },
  ]);
  console.log("Inserted Documents =>", insertResult);

  // Query Find Documents
  const findResult = await collection.find().toArray();
  console.log("Found Documents =>", findResult);

  // Query Update Document
  const updateResult = await collection.updateOne(
    { name: "Nunez" },
    { $set: { email: "nunez@yahoo.com" } }
  );
  console.log("Updated Document =>", updateResult);

  // Query Delete Document
  const deleteResult = await collection.deleteOne({ name: "Jack" });
  console.log("Deleted Document =>", deleteResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
