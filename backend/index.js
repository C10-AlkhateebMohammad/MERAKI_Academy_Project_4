const express = require("express");
const cors = require("cors");

const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.use(cors());
const db=require('./models/db')
app.use(express.json());
const userRouter = require('./routes/users');
app.use('/users',userRouter)
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
