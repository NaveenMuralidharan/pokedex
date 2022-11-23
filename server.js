///////IMPORT dependencies
///////////////////////////////
require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const pokedex = require("./models/pokemon")

const app = express()
app.use(express.urlencoded({extended: true}))

// Routes
// index route
app.get('/pokedex', (req, res)=>{
    res.render("index.ejs", { pokedex })
})

// New route
app.get("/pokedex/new", (req, res)=>{
    res.render("new.ejs")
})

// create route
app.post("/pokedex", (req, res)=>{

    const newPokemon = {
                            name: req.body.name,
                            img: req.body.img,
                            status: {}
                        }
    
    newPokemon.types = req.body.types.split(" ")                    
    newPokemon.status.hp = req.body.hp
    newPokemon.status.attack = req.body.attack
    newPokemon.status.defense = req.body.defense                    
    
    pokedex.push(newPokemon)
    
    console.log(pokedex[pokedex.length-1])
    
    res.redirect("/pokedex")
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
