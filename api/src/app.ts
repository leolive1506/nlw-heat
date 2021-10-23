import "dotenv/config"
import express from "express"
import http from "http"
import cors from "cors"

import { Server, Socket } from "socket.io"

import { router } from "./routes"

const app = express()

app.use(cors()) // habilitar p app

const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    // ver se algum user se conectou
    console.log(`Usuario conectado no socket ${socket.id}`)
})

// express não aceita somente req type json, precisa especificar que é do tipo json, se não retorna 
//"Cannot destructure property 'code' of 'req.body' as it is undefined."

app.use(express.json())

app.use(router)

app.get("/github", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`) // client_id no .env
})

app.get("/signin/callback", (req, res) => {
    //pega a rota de callback definida no OAuth app do git hub

    const { code } = req.query //retorna o código do usuário quando autenticado
    return res.json({code})
})

export { serverHttp, io }