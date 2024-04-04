const express = require("express");
const cors = require("cors");
const bodyParser=require('body-parser')
const db=require('./models/db')
const userRouter = require('./routes/users');
const productRouter=require('./routes/product')
const cartRouter=require('./routes/cart')
const rolesRouter = require("./routes/roles");
const categoryRouter=require("./routes/category")
const visitRouter=require('./routes/vistCounter')
const priceRouter=require('./routes/price')
const ConatRouter=require('./routes/contactUs')
const bestBroduct=require('./routes/bestProduct')
const winter=require('./routes/winter')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/users',userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use("/roles", rolesRouter);
app.use('/category',categoryRouter)
app.use('/visit',visitRouter)
app.use('/price',priceRouter)
app.use('/contact',ConatRouter)
app.use('/best',bestBroduct)
app.use('/winter',winter)



// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
