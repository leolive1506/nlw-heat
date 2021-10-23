# Visão geral<br/>
`Depencias` no projeto
    express, prisma, tsx, dotenv, jsonwebtoken, socket.IO, cors

> Obs: Prisma comunicação com banco de dados

# 1) Configuração e instalação Inicial

```
yarn add express
```

```
yarn add -D @types/express typescript ts-node-dev
```
`Criar config do ts`
        
```
yarn tsc --init
```

>@types/express - dependencias das tipagens do express, instala como -D pq so importa no momento do desenvolvimento

>ts-node-dev - lib p utilizar com ts, faz o autoreload da aplicação por padrão node não entende ts, essa biblioteca formata para forma que node consiga entender

`Usar ts-node-dev`
```
"scripts": {
    "dev": "ts-node-dev --exit-child src/app.ts"
},
```

# 2) Instalar o prisma

[SITE PRISMA](https://www.prisma.io/docs/getting-started/quickstart)

## Duas formas de usar

```
curl -L https://pris.ly/quickstart | tar -xz --strip=2 quickstart-master/typescript/starter

- cd starter 
- npm install 

```

`Ou adicionar a um projeto ja existente`

> [Link](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres)

Instalar
```
yarn add prisma -D
```
Invocar usando o npx ou Própria biblioteca do prisma, após isso ele cria um arquivo .env
```
yarn prisma init
```

### O que tem no .env
> Um database url com as configurações do banco que vai utilizar, por padrão traz do postgresql, mas pode usar outros que ele tenha suporte (com SQLite isso muda um pouco)

> Para usar o process.env e ter acesso ao .env e importar dps
``` 
yarn add dotenv
import "dotenv/config"
```


### schema.prisma
> Toda config de banco de dados, table

# 3) Autenticação com gitHub
[OAuth Apps (Site Git Hub)](https://github.com/settings/developers) <br>
`New OAuth app`
- Name
- URL da nossa aplicaçao
- description
- URL Para enviar as informações

`Dps disso ele cria um Client ID, precis agerar um Client secrets (copiar valor gerado pq some com reload da pag`

`Para recuperar o acess_token, instalar o axios`
```
yarn add axios
yarn add @types/axios -D
```

# 4) Dps de gerado acess_token(teste no insomnia)
> Para lidar com acess_token dentro da aplicação
```
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D
```

# 5) Comandos Prisma
```
yarn prisma migrate dev
```
Vai pgt name for the new migration
>Migration é um histórico de tudo que ta sendo realizado dentro do banco de dados

`Ver as tabelas no Browser`
````
yarn prisma studio
````
# 6) Socket.IO 
```
yarn add socket.io
yarn add @types/socket.io -D
```

> Auxilia na comunicação entre cliente e servidor
> Quando trabalha com protocolo HTTP, tem uma req com inicio e fim 

# 7) Cors
```
yarn add cors
yarn add @types/cors -D
```

> responsável por permitir ou barrar as req dentro da aplicação

# Observações Gerais
> O browser só entende requisições do tipo get
> Socket.IO auxilia na comunicação entre cliente e servidor

#RumoAoPróximoNível
