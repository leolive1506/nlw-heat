import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    // se não tiver autenticado retorna erro, se tiver passa pra frente (nextFunction)

    const authToken = req.headers.authorization
    if(!authToken) {
        return res.status(401).json({
            errorCode: "token.invalid"
        })
    }

    // quando recebe token dentro do header vem como
    // Bearer 23u498172398479
    // so importa o codigo

    const [, token] = authToken.split(" ") //separando pelos espaços
    // [0] Bearer
    // [1] 23u498172398479

    try { 

        const { sub } = verify(token, process.env.JWT_SECRET)  as IPayload
        //sub é o id de usuário
        //se o token for inválido lança uma exceção

        req.user_id = sub
        
        return next()
    } catch (err) {
        return res.status(401).json({errorCode: "token.expired"})
    }
}