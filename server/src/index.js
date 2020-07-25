require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT || 3001;
const app = express();
const api = require("./routes/api");
const { connect } = require("mongoose");


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api", api);


app.listen(port, () => console.log(`Running app on ${port}`));
connectToDb();

function connectToDb() {
    connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then(() => console.log("Connected to mongo"))
        .catch(e => console.log(e));
}