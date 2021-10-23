# Dependencias Usadas
## `Vite`
`Criar projetos react e js moderno, tem funcionalidade comuns`
[Formas de começar Projeto](https://vitejs.dev/guide/#trying-vite-online)
```
yarn create vite nameApp --template react-ts
```

## `Axios`
```
yarn add axios
```

## `Socket.io-client`
```
yarn add socket.io-client
import io from "socket.io-client"

const socket = io('http://localhost:4000')
```
> Cliente do webSocket, ouvir coisas em tempo real do backend

# CSS Modules
> Um não impacta no outro, pode ter nome de classes iguais
> Example.module.css import styles from "./Example.module.css"



# SAAS
### Pode usar encadeamento
### `Fazer hover`

```
&:hover
```

## `Pegar primeira img`
```
>img
```
## `Pegar segundo elemento`
```
&:nth-child(2)
```


# React
## `Adicionar icons`
```
yarn add react-icons
```
**Exemplo**
```
import { VscGithubInverted } from 'react-icons/vsc'
<VscGithubInverted size="24" />
```

> OBS: Vira um svg

## `Quando usar imgs no React`
`Precisa importar`

## `useEffect`
> Quando quer carregar algum tipo de dado assim que o component é exibido em tela

```
useEffect(() => função executar, [quando executar])
```

> Se quiser executar apenas uma vez, deixa o array de dependencias vazio

## `useState`
> Armazenar informações dentro do componente
```
const [var, setVar] = useState(valueInicial)
```
> Utiliza setVar pra auterar o valor da variavel


## `Geral`
> Colocar valor **ou** colocar um pipe ( | )
```
user: User | null
```

> Ver se não está null, tranformando em true ou false, retorna true caso não esteja vazio
```
{ !!user ? <SendMessageForm /> : <LoginBox />}
```
> Nesse caso acima, se não estiver nulo, mostra caixa pra digitar msg, se estiver, mostra caixa p fazer login

`Definir tipo para evento da função (se tiver usando ts)`
```
import {FormEvent } from 'react'

function handleSendMessage(e: FormEvent) {

}
```


## `Erros`
```
Each child in a list should have a unique "key" prop.
```
> Toda vez que usa map dentro do react, é obg a passar p primeiro el propriedade key={} que é a informação unica pra cada dessas messages
```
<li key={message.id}>
```

## Context API
> Permite acessar algo a todos componentes da aplicação
```
import { createContext } from "react";

const AuthContext = createContext({} as AuthContextData)
```
> {} as AuthContextData Ta definindo o type do AuthContext

```
type AuthProvider = {
    children: ReactNode
}

export function AuthProvider(props: AuthProvider) {
    return(
        <AuthContext.Provider value={{}}>
            {props.children}
        </AuthContext.Provider>
    )
}
```
> `AuthContext.Provider` - todos outros componente dentro dele tenham acesso a informação do contexto
> `ReactNode` - Qualquer coisa aceitável pelo node


# Conexão back end

## `API`
```
import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4000", //local que back ta rodando
})
```

## `No arquivo`
```
import { api } from "../../services/api"

useEffect(() => {
        api.get('/messages/last3').then(response => console.log(response.data))
}, [])
```
