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

    res.status(200).json({
        data: data
    });
});

module.exports = characterRouter;