// Entry point for the backend server

import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

// Load environment variables from .env
dotenv.config();

// Use PORT from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

// Create HTTP server and attach Express app
const server = http.createServer(app);

// Start listening
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
