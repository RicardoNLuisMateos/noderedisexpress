const { default: axios } = require("axios");
const express = require("express");
const characterRouter = express.Router();
const redis = require("redis");

// Connecting to redis

const client = redis.createClient(6379);


characterRouter.get("/character", async (req, res) => {
    await client.connect();
    console.log(req.route.path)

    let data;

    const getSaved = await client.get(req.route.path);
    console.log(getSaved)
    if(getSaved){
        data = JSON.parse(getSaved);
        console.log("OBTENIDO DE REDIS")
    }else{
        const response = await axios.get(
            "https://rickandmortyapi.com/api/character"
        );
        
        const saveRedis = await client.set('/character', JSON.stringify(response.data));
        data = response.data;
        console.log("OBTENIDO DE WEB")
    }
    client.quit();

    res.status(200).json({
        data: data
    });
});

characterRouter.get("/character/:id", async (req, res) => {

    const key = '/character/'+req.params.id;
    console.log(key)
    await client.connect();

    let data;

    const getSaved = await client.get(key);
    if(getSaved){
        data = JSON.parse(getSaved);
        console.log("OBTENIDO REDIS");
    }else{
        const response = await axios.get(
            "https://rickandmortyapi.com/api/character/" + req.params.id
        );

        data = response.data;
        const saveRedis = await client.set(key, JSON.stringify(response.data))
        console.log("OBTENIDO WEB");
    }
    client.quit();
    res.status(200).json({
        data: data
    });
});

module.exports = characterRouter;