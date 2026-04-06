// Import the Express module using modern JavaScript ES module syntax
import express from "express";
// Create an instance of an Express application
const app = express();
// Define the port number the server will listen on
const PORT = 3000;

/**
 * Express middleware for parsing JSON request bodies into req.body.
 * This allows the server to automatically read and parse JSON data 
 * from the body of incoming HTTP requests (such as POST requests). 
 * Without this, req.body would be undefined when handling JSON payloads.
 */
app.use(express.json());

/**
 * Route: GET /
 * Description: Handles requests to the root URL.
 * Response: Sends back a classic "Hello, World!" message.
 */
app.get("/", (req, res) => {
  res.send("Hello, World! Server is up and running.");
});

/**
 * Route: GET /greeting
 * Description: Handles requests to /greeting
 * Response: Sends back a JSON object with a greeting message.
 */
app.get("/greeting", (req, res) => {
  res.json({ message: "Hey there, this is your server responding!" });
});

/**
 * Route: POST /messages
 * Description: Handles POST requests to /messages
 * Request Body: JSON data sent by the client, available in req.body
 * Response: Send back a JSON object containing the submitted data and the 
 * current date. The response should have the form { received: ... }
 */
app.post("/messages", (req, res) => {
  // TODO: create a new object that copies req.body, adds the current date 
  // using the JS Date object, and send it back inside a "received" field
  
  // Create a new object with the received data and current date
  const receivedData = {
    ...req.body,  // Spread operator copies all properties from req.body
    title: "My First Message",
    content: "Today I started learning about Node and Express!",
    date: new Date().toISOString().split('T')[0]
  };
  
  // Send back the response with the received field
  res.json({ received: receivedData});
});

/**
 * Start the server. The server listens on the defined PORT and logs a 
 * message to the console when running.
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});