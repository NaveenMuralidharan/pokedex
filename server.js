///////IMPORT dependencies
///////////////////////////////
require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")


const app = express()


// Routes
// index route
app.get('/pokedex', (req, res)=>{
    res.send('/pokedex get route')
})

app.listen(process.env.PORT, ()=> {console.log("App is running on port " + process.env.PORT)})
