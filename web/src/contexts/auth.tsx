import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthResponse = {
    token: string,
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string
    }
}   

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    // se user não tiver autenticado vai ta nula
    user: User | null;
    signInUrl: string;
    // return void = não tem retorno
    signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
    children: ReactNode
}

export function AuthProvider(props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null)

    // scope - quais informações q quer do usuário, user -> só as principaiss
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=fc56759e7e48b23818ca`
 

    async function signIn(githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode
        })

        const { token, user } = response.data

        // salvar token no storage p caso feche navegador continua salvo
        localStorage.setItem("@dowhile:token", token)

        api.defaults.headers.common.authorization = `Bearer ${token}`
        
        setUser(user)
    }

    function signOut() {
        setUser(null)
        localStorage.removeItem("@dowhile:token")
    }

    // obter localStorage
    useEffect(() => {
        const token = localStorage.getItem("@dowhile:token")
        
        if(token) {
            // precisa enviar token na requisição, pelo header
            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<User>("profile").then(response => {
                setUser(response.data)
            })
        }
    }, [])

    useEffect(() => {
        const url = window.location.href
        
        const hasGithubCode = url.includes("?code=")

        if(hasGithubCode) {
            // separar a url se tiver code de login
            const [urlWithoutCode, githubCode] = url.split("?code=")

            // limpar url | pushState({}, urlVazia, url sem o code)
            window.history.pushState({}, "", urlWithoutCode)

            signIn(githubCode)
        }
    }, [])

    return(
        <AuthContext.Provider value={{signInUrl, user, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}