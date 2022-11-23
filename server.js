///////IMPORT dependencies
///////////////////////////////
require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const pokedex = require("./models/pokemon")

const app = express()


// Routes
// index route
app.get('/pokedex', (req, res)=>{
    res.render("index.ejs", { pokedex })
})

// show route
app.get('/pokedex/:id', (req, res)=>{

    pokedex.forEach((pokemon)=>{
        if(pokemon.id === req.params.id){
            res.render("show.ejs", { pokemon })
        }
    })

    
})




app.listen(process.env.PORT, ()=> {console.log("App is running on port " + process.env.PORT)})
