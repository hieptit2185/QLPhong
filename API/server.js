const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const listRooms = require('./routes/rooms')

const port = 8800;
app.use(cors());

mongoose
    .connect(
        `mongodb+srv://khachiep:khachiep12@cluster0.75k6z.mongodb.net/managementRooms?retryWrites=true&w=majority`,
        {
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("😎 DB is running succesfully")
    })
    .catch(console.error)


app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use("/api/room", listRooms);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})