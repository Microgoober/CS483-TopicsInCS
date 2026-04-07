// File: index.js
// Import the MongoClient class from the official MongoDB driver package
import { MongoClient } from "mongodb";
// Define the connection URI string
// Replace <username> and <password> with your MongoDB Atlas credentials
// Copy and paste your own string from MongoDB Atlas and not the string below

// Create a new MongoClient instance using the connection URI
const client = new MongoClient(uri);
async function insertDocument() {
try {
// Attempt to connect to the MongoDB cluster
await client.connect();
console.log("Connected to MongoDB");
// Select your database (e.g., thoughtstream-db) from the deployment
// (cluster)
const database = client.db("thoughtstream-db");
// Select your collection (e.g., test-messages) to insert the document
const collection = database.collection("test-messages");
// Define the document to be inserted — an example below
const doc = {
username: "cs483",
mood: "Excited to learn MongoDB!",
favoriteLanguage: "JavaScript",
learningGoal: "Master backend development",
timestamp: new Date(), // Automatically adds the current date and time
};
// Insert the document into the collection and store the result
const result = await collection.insertOne(doc);
// Print confirmation with the inserted document's unique _id
console.log(`Document inserted with _id: ${result.insertedId}`);
} catch (err) {
// Handle any errors during connection or insertion
console.error("An error occurred:", err);
} finally {
// Ensure the database connection is closed after completion
await client.close();
}
}
insertDocument();