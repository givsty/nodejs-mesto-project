import express from "express";

const app = express()

app.listen(3000, ()=>{
    console.log('server start on port', 3000)
})