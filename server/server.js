const express = require("express")
const app = express()
const cors = require("cors")
var bodyParser = require('body-parser');
require("dotenv").config("./env");

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require("./routes/record"))
const dbo = require("./db/conn")

app.listen(port, () => {
    dbo.connectToServer(function(err) {
        if(err) console.err(err)
    })

    console.log(`Server is runnig on port : ${port}`)
})