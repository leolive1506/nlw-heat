import { prisma } from ".prisma/client"
import axios from "axios"
import prismaClient from "../prisma"

import { sign } from "jsonwebtoken"
/* 
    . Receber code(string)
    . Recuperar o acess_token no git hub (token que git hub disponibilizar p ter acesso as informações do usuário)
    . Recuperar infos do user no github
    . Verificar se o user existe no db
        IF SIM = Gera um token p ele
        IF NÃO = Cria no db, gera um token

    . Retornar o token com as infos do user logado
*/

interface IAcessTokenResponse {
    // pegar somente oq precisa -> acess_token e deixar os outros de lado ("token_type", "scope")

    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService{
    // recebendo o code
    async execute(code: string) {
        // recuperar o acess_token
        const url = "https://github.com/login/oauth/access_token"

        // extrai o data de dentro do axios e nomeio ele como acessTokenResponse
        // axios.post(url, data, paramentrosAcessoAoToken)
        // EMTRE <> consegue definir oq ele vai ter no retorno
        const { data: accessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET, 
                code
            }, 
            headers: {
                "Accept": "application/json"
            }
        })

        // pega todas informações do usuário que ta logado
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        }) 

        // informações vindas do gitHub
        const { login, id, avatar_url, name } = response.data

        let user = await prismaClient.user.findFirst({
            // select where
            where: {
                // id github na table for igual id do acess_token
                github_id: id
            }
        })

        // se não existir, criar o user
        if(!user) {
         user = await prismaClient.user.create({
             data: { //data são todas informações que quer salvar
                github_id: id,
                login,
                avatar_url,
                name
             }
         })       
        }

        // sign({payload, secret, subject})
        // payload - tudo que o usuario que ta fazendo a req tenha acesso, geralmente informaçõs do user
        // secret - usado p criar token, como para validar o token
        // subject - id user e quando vai expirar
        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id
            }
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "1d"
        }
        )

        return { token, user } // quando usa o axios, toda informação que é retornada é inserida dentro do data
    }
}

export { AuthenticateUserService }