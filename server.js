///////IMPORT dependencies
///////////////////////////////
require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const pokedex = require("./models/pokemon")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Routes
// index route
app.get('/pokedex', (req, res)=>{
    res.render("index.ejs", { pokedex })
})

// New route
app.get("/pokedex/new", (req, res)=>{
    res.render("new.ejs")
})

// delete route
app.delete("/pokedex/:id", (req, res)=>{
    console.log(req.params.id)
    pokedex.forEach((pokemon, i)=>{
        if(pokemon.id === req.params.id){
            pokedex.splice(i, 1)
            res.redirect("/pokedex")
        }
    })
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
    newPokemon.id = pokedex.length + 1

console.log(newPokemon)
    pokedex.push(newPokemon)
    
    
    
    res.redirect("/pokedex")
})

// edit route
app.get("/pokedex/:id/edit", (req, res)=>{



    pokedex.forEach((pokemon)=>{
        
        if(pokemon.id === req.params.id){
     
            res.render("edit.ejs", { pokemon })
        }
    })
    

})

// update route:
app.put("/pokedex/:id", (req, res)=>{
    console.log(req.body)
    pokedex.forEach((pokemon, i)=>{
        if(pokemon.id === req.params.id){
            pokedex[i] = req.body
            res.redirect("/pokedex") 
        }
    })

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
