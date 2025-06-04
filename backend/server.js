const dotenv = require("dotenv");
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const emailRoutes = require("./routes/emailRoutes");


dotenv.config();
const app = express();
const server = http.createServer(app);


// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/emails", emailRoutes);


// MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.error("MongoDB Connection Error:", err));

// Sample Route
app.get("/", (req, res) => {
    res.send("Onebox Email Aggregator API Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});







